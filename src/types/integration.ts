export type IntegrationType = 'slack' | 'jira' | 'hanko' | 'cognito';

export interface Integration {
  id: string;
  type: IntegrationType;
  name: string;
  description: string;
  isEnabled: boolean;
  status: 'connected' | 'disconnected' | 'error';
  config: {
    [key: string]: string;
  };
  lastSync?: string;
  error?: string;
}

export interface IntegrationConfig {
  type: IntegrationType;
  fields: {
    name: string;
    key: string;
    type: 'text' | 'password' | 'url';
    required: boolean;
    placeholder?: string;
    description?: string;
  }[];
}

export interface IntegrationCardProps {
  integration: Integration;
  onToggle: (id: string, enabled: boolean) => void;
  onUpdate: (id: string, config: Record<string, string>) => void;
}
