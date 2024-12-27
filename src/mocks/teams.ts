import { TeamMember, Organization } from '../types/team';

export const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'owner',
    lastActive: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'admin',
    lastActive: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    role: 'member',
    lastActive: new Date(Date.now() - 172800000).toISOString(),
  },
];

export const mockOrganization: Organization = {
  id: '1',
  name: 'Acme Corp',
  plan: 'pro',
  seats: {
    total: 10,
    used: 3,
  },
  features: [
    { name: 'AI Test Generation', enabled: true },
    { name: 'Visual Testing', enabled: true },
    { name: 'API Testing', enabled: true },
    { name: 'Parallel Execution', enabled: false },
  ],
  usage: {
    testRuns: 1250,
    storage: 5.2,
    apiCalls: 15000,
  },
};
