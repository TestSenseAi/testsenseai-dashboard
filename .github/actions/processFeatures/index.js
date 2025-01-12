import fs from 'fs';
import path from 'path';
import core from '@actions/core';
import github from '@actions/github';
import matter from 'gray-matter';

async function main() {
  const token = process.env.GITHUB_TOKEN;
  const octokit = github.getOctokit(token);
  const { owner, repo } = github.context.repo;

  // Get all .md files from the features directory
  const featuresDir = core.getInput('features_directory') || './.github/features';
  const processedStateFile = path.join(featuresDir, '.processed-features.json');

  console.log(`Scanning directory: ${featuresDir}`);

  // Load processed features state
  let processedFeatures = {};
  try {
    if (fs.existsSync(processedStateFile)) {
      processedFeatures = JSON.parse(fs.readFileSync(processedStateFile, 'utf8'));
    }
  } catch (error) {
    console.warn('No existing processed features state found. Starting fresh.');
  }

  // Get all markdown files
  const featureFiles = fs
    .readdirSync(featuresDir)
    .filter((file) => file.endsWith('.md') && file !== '.processed-features.json');

  console.log(`Found ${featureFiles.length} feature files to process`);

  // Get existing issues to avoid duplicates
  const existingIssues = await getExistingIssues(octokit, owner, repo);
  const existingTitles = new Set(existingIssues.map((issue) => issue.title));

  for (const file of featureFiles) {
    const filePath = path.join(featuresDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const fileHash = calculateFileHash(fileContent);

    // Check if file has been processed and hasn't changed
    if (processedFeatures[file] && processedFeatures[file].hash === fileHash) {
      console.log(`Skipping ${file} - no changes detected`);
      continue;
    }

    console.log(`Processing ${file}...`);
    const tasks = parseFeaturePlan(fileContent);

    // Track newly created issues for this file
    const createdIssues = [];

    for (const task of tasks) {
      const issueTitle = formatIssueTitle(task);

      // Skip if issue already exists
      if (existingTitles.has(issueTitle)) {
        console.log(`Skipping existing issue: ${issueTitle}`);
        continue;
      }

      try {
        const issue = await createIssue(octokit, owner, repo, task);
        createdIssues.push({
          title: issueTitle,
          number: issue.number,
          id: issue.id,
        });
        console.log(`Created issue: ${issueTitle} (#${issue.number})`);
      } catch (error) {
        console.error(`Error creating issue: ${issueTitle}`, error);
      }
    }

    // Update processed state for this file
    processedFeatures[file] = {
      hash: fileHash,
      lastProcessed: new Date().toISOString(),
      createdIssues: createdIssues,
    };
  }

  // Save processed state
  fs.writeFileSync(processedStateFile, JSON.stringify(processedFeatures, null, 2));

  // Add processed state file to git if it's new or modified
  try {
    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: '.processed-features.json',
      message: 'Update processed features state',
      content: Buffer.from(JSON.stringify(processedFeatures, null, 2)).toString('base64'),
      sha: await getFileSha(octokit, owner, repo, '.processed-features.json'),
    });
  } catch (error) {
    console.warn('Failed to update processed features state in repository', error);
  }
}

async function getExistingIssues(octokit, owner, repo) {
  const issues = [];
  let page = 1;

  while (true) {
    const response = await octokit.rest.issues.listForRepo({
      owner,
      repo,
      state: 'all',
      per_page: 100,
      page,
    });

    if (response.data.length === 0) break;
    issues.push(...response.data);
    page++;
  }

  return issues;
}

function calculateFileHash(content) {
  const crypto = require('crypto');
  return crypto.createHash('sha256').update(content).digest('hex');
}

async function getFileSha(octokit, owner, repo, path) {
  try {
    const response = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
    });
    return response.data.sha;
  } catch (error) {
    if (error.status === 404) return null;
    throw error;
  }
}

async function createIssue(octokit, owner, repo, task) {
  const response = await octokit.rest.issues.create({
    owner,
    repo,
    title: formatIssueTitle(task),
    body: formatIssueBody(task),
    labels: task.labels,
    assignees: task.assignees,
  });

  return response.data;
}

function parseFeaturePlan(content) {
  const lines = content.split('\n');
  const tasks = [];
  let currentMilestone = '';
  let currentEpic = '';
  let currentTask = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Detect Milestones
    if (line.startsWith('## ') && !line.startsWith('## Epic')) {
      currentMilestone = line.replace(/^##\s+/, '').trim();
      continue;
    }

    // Detect Epics
    if (line.startsWith('## Epic') || line.startsWith('### Epic')) {
      currentEpic = line.replace(/^[#]+\s+Epic\s*\d*:\s*/, '').trim();
      continue;
    }

    // Detect Tasks
    if (line.startsWith('### ')) {
      if (currentTask) {
        tasks.push(currentTask);
      }
      currentTask = {
        milestone: currentMilestone,
        epic: currentEpic,
        title: line.replace(/^###\s*\d*\.\s*/, '').trim(),
        description: '',
        estimate: '',
        assignees: [],
        labels: [],
        priority: '',
        sprint: '',
        technicalStack: [],
      };
      continue;
    }

    if (currentTask) {
      // Parse task details with enhanced field support
      if (line.startsWith('**Priority:**')) {
        currentTask.priority = extractValue(line, 'Priority');
      } else if (line.startsWith('**Labels:**')) {
        currentTask.labels = extractValue(line, 'Labels')
          .split(',')
          .map((l) => l.trim());
      } else if (line.startsWith('**Assignee:**')) {
        currentTask.assignees = [extractValue(line, 'Assignee')];
      } else if (line.startsWith('**Sprint:**')) {
        currentTask.sprint = extractValue(line, 'Sprint');
      } else if (line.startsWith('**Technical Stack:**')) {
        currentTask.technicalStack = [];
        // Collect technical stack items until we hit an empty line or new section
        for (let j = i + 1; j < lines.length; j++) {
          const stackLine = lines[j].trim();
          if (stackLine.startsWith('-')) {
            currentTask.technicalStack.push(stackLine.substring(1).trim());
          } else if (stackLine === '' || stackLine.startsWith('**')) {
            break;
          }
        }
      } else if (line !== '') {
        currentTask.description += line + '\n';
      }
    }
  }

  // Add the last task
  if (currentTask) {
    tasks.push(currentTask);
  }

  return tasks;
}

function validateTasks(tasks) {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    throw new Error('No valid tasks found in feature plan');
  }

  for (const task of tasks) {
    if (!task.title || !task.epic) {
      throw new Error(`Invalid task data: Missing required fields (title or epic)`);
    }
  }
}

function formatIssueTitle(task) {
  const priority = task.priority ? `[${task.priority}] ` : '';
  return `${priority}${task.title} (${task.epic})`;
}

function formatIssueBody(task) {
  return `
## Overview
${task.description.trim()}

## Technical Details
${formatTechnicalStack(task.technicalStack)}

## Project Management
- **Epic:** ${task.epic}
- **Sprint:** ${task.sprint || 'TBD'}
- **Priority:** ${task.priority || 'Not set'}

## Implementation Checklist
${generateDefaultChecklist()}

## Acceptance Criteria
${generateDefaultAcceptanceCriteria()}
`;
}

function formatTechnicalStack(stack) {
  if (!stack || stack.length === 0) return '*To be defined*';
  return stack.map((item) => `- ${item}`).join('\n');
}

function generateDefaultChecklist() {
  return `
- [ ] Technical design review
- [ ] Implementation
- [ ] Unit tests
- [ ] Integration tests
- [ ] Documentation
- [ ] Code review
- [ ] QA verification`;
}

function generateDefaultAcceptanceCriteria() {
  return `
- [ ] Feature implements all specified functionality
- [ ] All tests pass
- [ ] Documentation is complete
- [ ] Code follows project standards
- [ ] Performance meets requirements`;
}

function formatLabels(task, prefix) {
  const baseLabels = task.labels || [];
  return baseLabels.map((label) => (prefix ? `${prefix}${label}` : label));
}

function extractValue(line, field) {
  return line.replace(`**${field}:**`, '').replace('**', '').trim();
}

async function createMilestoneIfNotExists(octokit, owner, repo, milestone) {
  try {
    const response = await octokit.rest.issues.createMilestone({
      owner,
      repo,
      title: milestone,
      description: `Milestone for ${milestone} features`,
    });
    console.log(`Created milestone: ${milestone}`);
    return response;
  } catch (error) {
    if (error.status === 422) {
      // Milestone already exists
      const milestones = await octokit.rest.issues.listMilestones({
        owner,
        repo,
        state: 'all',
      });
      const existing = milestones.data.find((m) => m.title === milestone);
      if (existing) {
        return { data: existing };
      }
    }
    throw error;
  }
}

main().catch((err) => core.setFailed(err.message));
