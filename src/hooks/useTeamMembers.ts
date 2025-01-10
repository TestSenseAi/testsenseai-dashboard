import { useCallback } from 'react';

// Mock data for team members
const mockTeamMembers = {
  'user-1': { name: 'John Doe', email: 'john@example.com', avatar: '' },
  'user-2': { name: 'Jane Smith', email: 'jane@example.com', avatar: '' },
};

export function useTeamMembers() {
  const getMemberDetails = useCallback((userId: string) => {
    return mockTeamMembers[userId as keyof typeof mockTeamMembers];
  }, []);

  return { getMemberDetails };
}
