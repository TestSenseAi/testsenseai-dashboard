export type ProjectPriority = 'low' | 'medium' | 'high';
export type ProjectStatus = 'not_started' | 'in_progress' | 'on_hold' | 'completed';
export type ProjectAccess = 'private' | 'internal' | 'public';

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  priority: ProjectPriority;
  status: ProjectStatus;
  budget: number;
  owner: {
    id: string;
    name: string;
    email: string;
  };
  teamId: string;
  access: ProjectAccess;
  members: TeamMember[];
  repositoryUrl: string;
  manager?: {
    id: string;
    name: string;
    email: string;
  };
  tags: ProjectTag[];
  category:
    | 'other'
    | 'web'
    | 'mobile'
    | 'desktop'
    | 'api'
    | 'database'
    | 'devops'
    | 'security'
    | 'design'
    | 'marketing'
    | 'product'
    | 'other';
  integrations: ProjectIntegrations;
  settings: ProjectSettings;
  engine: ProjectEngineSettings;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  version: number;
}

export interface ProjectIntegrations {
  github?: ProjectGithubIntegration;
  gitlab?: ProjectGitlabIntegration;
  bitbucket?: ProjectBitbucketIntegration;
  azure?: ProjectAzureIntegration;
  aws?: ProjectAwsIntegration;
  docker?: ProjectDockerIntegration;
  kubernetes?: ProjectKubernetesIntegration;
  figma?: ProjectFigmaIntegration;
}

export interface ProjectGithubIntegration {
  repositoryOwner: string;
  repositoryName: string;
  branch: string;
  lastSync: string;
  status: 'connected' | 'disconnected';
}

export interface ProjectGitlabIntegration {
  repositoryOwner: string;
  repositoryName: string;
  branch: string;
  lastSync: string;
  status: 'connected' | 'disconnected';
}

export interface ProjectBitbucketIntegration {
  repositoryOwner: string;
  repositoryName: string;
  branch: string;
  lastSync: string;
  status: 'connected' | 'disconnected';
}

export interface ProjectAzureIntegration {
  repositoryOwner: string;
  repositoryName: string;
  branch: string;
  lastSync: string;
  status: 'connected' | 'disconnected';
}

export interface ProjectAwsIntegration {
  repositoryOwner: string;
  repositoryName: string;
  branch: string;
  lastSync: string;
  status: 'connected' | 'disconnected';
}

export interface ProjectDockerIntegration {
  repositoryOwner: string;
  repositoryName: string;
  branch: string;
  lastSync: string;
  status: 'connected' | 'disconnected';
}

export interface ProjectKubernetesIntegration {
  repositoryOwner: string;
  repositoryName: string;
  branch: string;
  lastSync: string;
  status: 'connected' | 'disconnected';
}

export interface ProjectFigmaIntegration {
  fileId: string;
  lastSync: string;
  status: 'connected' | 'disconnected';
}

export interface ProjectSettings {
  archived: boolean;
  allowPublicAccess: boolean;
  requireCodeReview: boolean;
  autoRunTests: boolean;
  notifyOnFailure: boolean;
  branchProtection: boolean;
}

export interface ProjectEngineSettings {
  execution: ProjectExecutionSettings;
  reporting: ProjectReportingSettings;
  ai: ProjectAISettings;
  environment: ProjectEnvironmentSettings;
  integrations: ProjectIntegrationSettings;
}

export interface ProjectExecutionSettings {
  enabled: boolean;
  engine: 'local' | 'cloud';
}

export interface ProjectReportingSettings {
  enabled: boolean;
  format: 'pdf' | 'csv' | 'excel';
}

export interface ProjectAISettings {
  enabled: boolean;
  model: 'gpt-4o' | 'claude-3-5-sonnet';
}

export interface ProjectEnvironmentSettings {
  enabled: boolean;
  environment: 'development' | 'staging' | 'production';
}

export interface ProjectIntegrationSettings {
  enabled: boolean;
  integrations: string[];
}

export interface ProjectTag {
  id: string;
  name: string;
  color: string;
}

export interface ProjectCategory {
  id: string;
  name: string;
  color: string;
}

export interface Task {
  id: string;
  projectId: string;
  parentId?: string; // For subtasks
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  priority: ProjectPriority;
  status: ProjectStatus;
  assignees: string[]; // User IDs
  dependencies: string[]; // Task IDs
  progress: number;
  estimatedHours: number;
  actualHours: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  version: number;
}

export interface Milestone {
  id: string;
  projectId: string;
  name: string;
  description: string;
  dueDate: string;
  status: ProjectStatus;
  dependencies: string[]; // Task or Milestone IDs
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  version: number;
}

export interface TeamMember {
  id: string;
  projectId: string;
  userId: string;
  role: 'owner' | 'manager' | 'member' | 'viewer';
  department: string;
  reportsTo?: string; // User ID
  permissions: string[];
  joinedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResourceAllocation {
  id: string;
  projectId: string;
  resourceId: string; // User ID or equipment ID
  resourceType: 'human' | 'equipment';
  startDate: string;
  endDate: string;
  hoursPerDay: number;
  cost: number;
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  projectId: string;
  type: 'charter' | 'requirements' | 'progress_report' | 'meeting_minutes' | 'risk_register';
  title: string;
  content: string;
  attachments: string[]; // URLs
  version: number;
  status: 'draft' | 'review' | 'approved';
  approvers: string[]; // User IDs
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface AuditLog {
  id: string;
  entityId: string;
  entityType: 'project' | 'task' | 'milestone' | 'document' | 'team_member' | 'resource';
  action: 'create' | 'update' | 'delete';
  changes: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
  performedBy: string;
  performedAt: string;
  ipAddress: string;
  userAgent: string;
}
