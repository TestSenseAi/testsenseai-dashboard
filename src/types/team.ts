export type UserRole = 'owner' | 'admin' | 'member' | 'viewer';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  lastActive?: string;
}

export interface Organization {
  id: string;
  name: string;
  plan: 'free' | 'pro' | 'enterprise';
  seats: {
    total: number;
    used: number;
  };
  features: {
    name: string;
    enabled: boolean;
  }[];
  usage: {
    testRuns: number;
    storage: number;
    apiCalls: number;
    limits: {
      testRuns: number;
      storage: number;
      apiCalls: number;
    };
  };
}

export interface TeamListProps {
  members: TeamMember[];
  onUpdateRole: (memberId: string, role: UserRole) => Promise<void>;
  onRemoveMember: (memberId: string) => Promise<void>;
}

export interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (email: string, role: UserRole) => void;
}

export type TeamActivityType =
  | 'member-invited'
  | 'member-removed'
  | 'role-updated'
  | 'settings-updated';

export interface TeamActivity {
  id: string;
  type: TeamActivityType;
  description: string;
  timestamp: string;
  performedBy: string;
  metadata?: Record<string, any>;
}

export interface TeamSettings {
  require2FA: boolean;
  ssoEnabled: boolean;
  allowedDomains: string[];
  sessionTimeout: number;
  ipRestrictions: boolean;
  deviceManagement: boolean;
}

export type TeamActivityFilter = 'all' | 'members' | 'roles' | 'settings';
