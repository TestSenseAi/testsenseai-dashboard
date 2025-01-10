export interface Organization {
  id: string;
  name: string;
  logo?: string;
  domain: string;
  plan: 'free' | 'pro' | 'enterprise';
  features: OrganizationFeature[];
  settings: OrganizationSettings;
  billing: BillingInfo;
  security: SecuritySettings;
  integrations: IntegrationSettings;
}

export interface OrganizationFeature {
  id: string;
  name: string;
  enabled: boolean;
  requiresPlan: 'free' | 'pro' | 'enterprise';
}

export interface OrganizationSettings {
  general: {
    defaultTimezone: string;
    dateFormat: string;
    language: string;
    notificationEmail: string;
  };
  projects: {
    defaultVisibility: 'private' | 'internal' | 'public';
    requireApproval: boolean;
    maxProjects: number;
    archiveAfterDays: number;
  };
  security: {
    authentication: {
      requireMFA: boolean;
      mfaMethods: ('authenticator' | 'sms' | 'email')[];
      passwordPolicy: {
        minLength: number;
        requireNumbers: boolean;
        requireSymbols: boolean;
        requireUppercase: boolean;
        expiryDays: number;
      };
      sso: {
        enabled: boolean;
        provider?: 'google' | 'okta' | 'azure';
        enforced: boolean;
        domains: string[];
      };
    };
    sessions: {
      maxConcurrent: number;
      timeout: number;
      requireReauthFor: ('billing' | 'security' | 'api_keys')[];
    };
    access: {
      ipWhitelist: string[];
      allowedCountries: string[];
      restrictOutsideAccess: boolean;
    };
    audit: {
      enabled: boolean;
      retentionDays: number;
      logTypes: ('auth' | 'billing' | 'projects' | 'teams' | 'api')[];
    };
  };
  billing: {
    plan: {
      id: string;
      name: string;
      price: number;
      interval: 'monthly' | 'yearly';
      features: string[];
    };
    subscription: {
      status: 'active' | 'past_due' | 'canceled';
      currentPeriodEnd: string;
      cancelAtPeriodEnd: boolean;
    };
    payment: {
      method: 'card' | 'bank_transfer' | 'paypal';
      last4?: string;
      expiryMonth?: number;
      expiryYear?: number;
    };
    usage: {
      users: number;
      storage: number;
      apiCalls: number;
      projects: number;
    };
    limits: {
      maxUsers: number;
      maxStorage: number;
      maxApiCalls: number;
      maxProjects: number;
    };
  };
  teams: {
    allowTeamCreation: boolean;
    maxTeamSize: number;
    requireTeamLead: boolean;
    autoJoinDomain: boolean;
  };
  collaboration: {
    allowExternalSharing: boolean;
    allowGuestAccess: boolean;
    restrictDomains: boolean;
    allowedDomains: string[];
  };
}

export interface BillingInfo {
  plan: {
    id: string;
    name: string;
    price: number;
    interval: 'monthly' | 'yearly';
    features: string[];
  };
  subscription: {
    status: 'active' | 'past_due' | 'canceled';
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
  };
  payment: {
    method: 'card' | 'bank_transfer' | 'paypal';
    last4?: string;
    expiryMonth?: number;
    expiryYear?: number;
  };
  usage: {
    users: number;
    storage: number;
    apiCalls: number;
    projects: number;
  };
  limits: {
    maxUsers: number;
    maxStorage: number;
    maxApiCalls: number;
    maxProjects: number;
  };
}

export interface SecuritySettings {
  authentication: {
    requireMFA: boolean;
    mfaMethods: ('authenticator' | 'sms' | 'email')[];
    passwordPolicy: {
      minLength: number;
      requireNumbers: boolean;
      requireSymbols: boolean;
      requireUppercase: boolean;
      expiryDays: number;
    };
    sso: {
      enabled: boolean;
      provider?: 'google' | 'okta' | 'azure';
      enforced: boolean;
      domains: string[];
    };
  };
  sessions: {
    maxConcurrent: number;
    timeout: number;
    requireReauthFor: ('billing' | 'security' | 'api_keys')[];
  };
  access: {
    ipWhitelist: string[];
    allowedCountries: string[];
    restrictOutsideAccess: boolean;
  };
  audit: {
    enabled: boolean;
    retentionDays: number;
    logTypes: ('auth' | 'billing' | 'projects' | 'teams' | 'api')[];
  };
}

export interface IntegrationSettings {
  vcs: {
    github?: {
      enabled: boolean;
      installationId: string;
      repositories: string[];
      permissions: string[];
    };
    gitlab?: {
      enabled: boolean;
      instanceUrl: string;
      accessToken: string;
      projects: string[];
    };
  };
  ci: {
    jenkins?: {
      enabled: boolean;
      url: string;
      username: string;
      apiToken: string;
    };
    circleci?: {
      enabled: boolean;
      apiKey: string;
      projects: string[];
    };
  };
  monitoring: {
    datadog?: {
      enabled: boolean;
      apiKey: string;
      appKey: string;
      metrics: string[];
    };
    newrelic?: {
      enabled: boolean;
      accountId: string;
      apiKey: string;
      appName: string;
    };
  };
  communication: {
    slack?: {
      enabled: boolean;
      workspace: string;
      channels: string[];
      notifications: {
        failures: boolean;
        deployments: boolean;
        security: boolean;
      };
    };
    teams?: {
      enabled: boolean;
      tenantId: string;
      channels: string[];
      webhooks: string[];
    };
  };
}
