import fs from 'fs';
import path from 'path';
import core from '@actions/core';
import github from '@actions/github';
import matter from 'gray-matter';

async function main() {
  // Get inputs from the GitHub Action
  const featureFile = core.getInput('feature_file') || 'mvp_features.md';
  const createMilestone = core.getInput('create_milestone') === 'true';
  const labelPrefix = core.getInput('label_prefix') || '';
  const dryRun = core.getInput('dry_run') === 'true';

  const token = process.env.GITHUB_TOKEN;
  const octokit = github.getOctokit(token);
  const { owner, repo } = github.context.repo;

  console.log(`Processing feature file: ${featureFile}`);
  console.log(`Create milestones: ${createMilestone}`);
  console.log(`Label prefix: ${labelPrefix}`);
  console.log(`Dry run: ${dryRun}`);

  // Read and validate the feature file
  const filePath = path.join(process.cwd(), featureFile);
  let fileContent;
  try {
    fileContent = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    core.setFailed(`Failed to read file at ${filePath}: ${error.message}`);
    return;
  }

  // Parse the markdown content with enhanced error handling
  let tasks;
  try {
    tasks = parseFeaturePlan(fileContent);
    validateTasks(tasks);
  } catch (error) {
    core.setFailed(`Failed to parse feature plan: ${error.message}`);
    return;
  }

  // Create milestones if requested
  const milestoneMap = new Map();
  if (createMilestone) {
    for (const task of tasks) {
      const milestone = task.sprint?.split('-')[0]; // Extract milestone from sprint (e.g., "M1" from "M1-Sprint1")
      if (milestone && !milestoneMap.has(milestone)) {
        try {
          const response = await createMilestoneIfNotExists(octokit, owner, repo, milestone);
          milestoneMap.set(milestone, response.data.number);
        } catch (error) {
          console.warn(`Warning: Failed to create milestone ${milestone}: ${error.message}`);
        }
      }
    }
  }

  // Process each task
  for (const task of tasks) {
    const issueTitle = formatIssueTitle(task);
    const issueBody = formatIssueBody(task);
    const labels = formatLabels(task, labelPrefix);

    // Get milestone number if applicable
    const milestone = task.sprint?.split('-')[0];
    const milestoneNumber = milestone ? milestoneMap.get(milestone) : undefined;

    if (dryRun) {
      console.log('\n=== Dry Run Output ===');
      console.log('Title:', issueTitle);
      console.log('Labels:', labels);
      console.log('Milestone:', milestone);
      console.log('Body:', issueBody);
      continue;
    }

    try {
      const response = await octokit.rest.issues.create({
        owner,
        repo,
        title: issueTitle,
        body: issueBody,
        labels,
        assignees: task.assignees,
        milestone: milestoneNumber,
      });
      console.log(`Created issue: ${issueTitle} (#${response.data.number})`);
    } catch (error) {
      console.error(`Error creating issue: ${issueTitle}`);
      console.error(error);
    }
  }
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
