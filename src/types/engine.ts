export type Browser = 'chromium' | 'firefox' | 'webkit';

export interface EngineSettings {
  execution: {
    maxParallelTests: number;
    defaultTimeout: number;
    retryCount: number;
    browsers: Browser[];
    screenshotOnFailure: boolean;
    videoRecording: boolean;
    traceEnabled: boolean;
    performance: {
      networkThrottling: boolean;
      cpuThrottling: boolean;
      memoryLimit: number; // MB
      networkCondition: 'fast3g' | '3g' | 'slow3g' | 'offline';
    };
    isolation: {
      cleanBrowserContext: boolean;
      clearCookies: boolean;
      clearLocalStorage: boolean;
      clearCache: boolean;
    };
  };
  reporting: {
    detailedLogs: boolean;
    saveArtifacts: boolean;
    artifactRetention: number; // days
    customReports: boolean;
    notificationChannels: ('email' | 'slack' | 'teams')[];
    metrics: {
      collectPerformanceMetrics: boolean;
      collectCoverageData: boolean;
      trackFlakiness: boolean;
      historicalTrends: boolean;
    };
    alerts: {
      failureThreshold: number;
      performanceThreshold: number; // ms
      notifyOnThresholdBreached: boolean;
      notifyOnFlaky: boolean;
    };
  };
  ai: {
    enabled: boolean;
    autoRepair: boolean;
    suggestionConfidence: number;
    maxSuggestionsPerRun: number;
    learningEnabled: boolean;
    features: {
      selectorMaintenance: boolean;
      testGeneration: boolean;
      visualValidation: boolean;
      performanceAnalysis: boolean;
      riskAssessment: boolean;
    };
    training: {
      useHistoricalData: boolean;
      dataRetentionPeriod: number; // days
      modelUpdateFrequency: 'daily' | 'weekly' | 'monthly';
    };
  };
  environment: {
    baseUrl: string;
    apiEndpoint: string;
    variables: Record<string, string>;
    secrets: Record<string, string>;
    stages: {
      dev: EnvironmentConfig;
      staging: EnvironmentConfig;
      prod: EnvironmentConfig;
    };
    proxy: {
      enabled: boolean;
      url?: string;
      auth?: {
        username: string;
        password: string;
      };
    };
  };
  integrations: {
    cicd: {
      enabled: boolean;
      provider: 'github' | 'gitlab' | 'jenkins' | 'azure';
      webhookUrl?: string;
      apiKey?: string;
      triggers: {
        onPush: boolean;
        onPullRequest: boolean;
        onRelease: boolean;
        schedules: string[]; // cron expressions
      };
    };
    monitoring: {
      enabled: boolean;
      provider: 'datadog' | 'newrelic' | 'prometheus';
      endpoint?: string;
      apiKey?: string;
      metrics: {
        testDuration: boolean;
        errorRates: boolean;
        coverage: boolean;
        performance: boolean;
      };
    };
    security: {
      enabled: boolean;
      scanDependencies: boolean;
      vulnerabilityThreshold: 'low' | 'medium' | 'high';
      autoFix: boolean;
      excludePatterns: string[];
    };
  };
  maintenance: {
    cleanup: {
      enabled: boolean;
      artifactRetention: number; // days
      logRetention: number; // days
      screenshotRetention: number; // days
      videoRetention: number; // days
    };
    backup: {
      enabled: boolean;
      frequency: 'daily' | 'weekly' | 'monthly';
      location: string;
      retention: number; // days
    };
    health: {
      checkFrequency: number; // minutes
      autoRestart: boolean;
      maxMemoryUsage: number; // MB
      alertOnIssues: boolean;
    };
  };
}

interface EnvironmentConfig {
  url: string;
  apiUrl: string;
  auth: {
    type: 'basic' | 'oauth' | 'token';
    credentials: Record<string, string>;
  };
  variables: Record<string, string>;
  features: Record<string, boolean>;
}
