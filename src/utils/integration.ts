import { IntegrationConfig, IntegrationType } from '../types/integration';

const integrationConfigs: Record<IntegrationType, IntegrationConfig> = {
  slack: {
    type: 'slack',
    fields: [
      {
        name: 'Webhook URL',
        key: 'webhookUrl',
        type: 'url',
        required: true,
        placeholder: 'https://hooks.slack.com/services/...',
        description: 'Slack webhook URL for notifications',
      },
      {
        name: 'Channel',
        key: 'channel',
        type: 'text',
        required: true,
        placeholder: '#test-alerts',
        description: 'Channel to send notifications to',
      },
    ],
  },
  jira: {
    type: 'jira',
    fields: [
      {
        name: 'Domain',
        key: 'domain',
        type: 'url',
        required: true,
        placeholder: 'https://your-domain.atlassian.net',
      },
      {
        name: 'API Token',
        key: 'apiToken',
        type: 'password',
        required: true,
        description: 'Jira API token',
      },
      {
        name: 'Email',
        key: 'email',
        type: 'text',
        required: true,
        description: 'Email associated with the API token',
      },
    ],
  },
  hanko: {
    type: 'hanko',
    fields: [
      {
        name: 'API URL',
        key: 'apiUrl',
        type: 'url',
        required: true,
        placeholder: 'https://api.hanko.io',
      },
      {
        name: 'API Key',
        key: 'apiKey',
        type: 'password',
        required: true,
      },
    ],
  },
  cognito: {
    type: 'cognito',
    fields: [
      {
        name: 'User Pool ID',
        key: 'userPoolId',
        type: 'text',
        required: true,
      },
      {
        name: 'Client ID',
        key: 'clientId',
        type: 'text',
        required: true,
      },
      {
        name: 'Region',
        key: 'region',
        type: 'text',
        required: true,
        placeholder: 'us-east-1',
      },
    ],
  },
};

export function getIntegrationConfig(type: IntegrationType): IntegrationConfig {
  return integrationConfigs[type];
}
