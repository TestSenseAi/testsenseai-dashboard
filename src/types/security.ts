export interface SecurityAuditLog {
  id: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  timestamp: string;
  metadata: Record<string, any>;
}

export interface SecuritySettings extends Record<string, boolean> {
  require2FA: boolean;
  ssoEnabled: boolean;
  ipRestrictions: boolean;
  deviceManagement: boolean;
  sessionTimeout: boolean;
}
