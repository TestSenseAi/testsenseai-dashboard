import fs from 'fs';
import core from '@actions/core';
import github from '@actions/github';
import matter from 'gray-matter';

async function main() {
  const token = process.env.GITHUB_TOKEN;
  const octokit = github.getOctokit(token);
  const { owner, repo } = github.context.repo;

  const filePath = './feature.md';
  let fileContent;
  try {
    fileContent = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    core.setFailed(`Failed to read file at ${filePath}: ${error.message}`);
    return;
  }

  // Parse the markdown content
  const tasks = parseFeaturePlan(fileContent);

  // Validate tasks array
  if (!Array.isArray(tasks) || tasks.length === 0) {
    throw new Error('No valid tasks found in implementation plan');
  }

  for (const task of tasks) {
    if (!task.title || !task.epic) {
      throw new Error(`Invalid task data: Missing required fields`);
    }
    const issueTitle = `${task.title} [${task.epic}]`;

    const issueBody = `
**Epic:** ${task.epic}

${task.description}

**Estimate:** ${task.estimate}
`;

    const issueLabels = task.labels;

    try {
      await octokit.rest.issues.create({
        owner,
        repo,
        title: issueTitle,
        body: issueBody,
        labels: issueLabels,
        assignees: task.assignees,
      });
      console.log(`Created issue: ${issueTitle}`);
    } catch (error) {
      console.error(`Error creating issue: ${issueTitle}`);
      console.error(error);
    }
  }
}

function parseFeaturePlan(content) {
  const lines = content.split('\n');
  const tasks = [];
  let currentEpic = '';
  let currentTask = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Detect Epics
    if (line.startsWith('## Epic')) {
      currentEpic = line.replace(/^##\s+Epic\s*\d*:\s*/, '').trim();
    }

    // Detect Tasks
    if (line.startsWith('###')) {
      if (currentTask) {
        tasks.push(currentTask);
      }
      currentTask = {
        epic: currentEpic,
        title: line.replace(/^###\s*/, '').trim(),
        description: '',
        estimate: '',
        assignees: [],
        labels: [],
      };
      continue;
    }

    if (currentTask) {
      // Parse task details
      if (line.startsWith('**Estimate:')) {
        currentTask.estimate = line.replace('**Estimate:', '').replace('**', '').trim();
      } else if (line.startsWith('**Assignee:')) {
        const assigneeLine = line.replace('**Assignee:', '').replace('**', '').trim();
        currentTask.assignees = assigneeLine.split(',').map((a) => a.trim());
      } else if (line.startsWith('**Labels:')) {
        const labelsLine = line.replace('**Labels:', '').replace('**', '').trim();
        currentTask.labels = labelsLine.split(',').map((l) => l.trim());
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

main().catch((err) => core.setFailed(err.message));
