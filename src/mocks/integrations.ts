import { Integration } from '../types/integration';

export const mockIntegrations: Integration[] = [
  {
    id: '1',
    type: 'slack',
    name: 'Slack',
    description: 'Get notifications about test results and alerts in Slack',
    isEnabled: true,
    status: 'connected',
    config: {
      webhookUrl: 'https://hooks.slack.com/services/xxx',
      channel: '#test-alerts',
    },
    lastSync: new Date().toISOString(),
  },
  {
    id: '2',
    type: 'jira',
    name: 'Jira',
    description: 'Create and update issues based on test results',
    isEnabled: false,
    status: 'disconnected',
    config: {},
  },
  {
    id: '3',
    type: 'hanko',
    name: 'Hanko',
    description: 'Passwordless authentication for your team',
    isEnabled: true,
    status: 'error',
    config: {
      apiUrl: 'https://api.hanko.io',
      apiKey: '****',
    },
    error: 'API key expired',
  },
  {
    id: '4',
    type: 'cognito',
    name: 'AWS Cognito',
    description: 'User authentication and access management',
    isEnabled: false,
    status: 'disconnected',
    config: {},
  },
];
