import { useCallback } from 'react';
import { useTeamStore } from '../store/team';
import { mockTeamMembers, mockOrganization } from '../mocks/teams';
import { UserRole } from '../types/team';

export function useTeam() {
  const { members, organization, updateMemberRole, removeMember, addMember } = useTeamStore();

  const handleUpdateRole = useCallback(
    async (memberId: string, role: UserRole) => {
      updateMemberRole(memberId, role);
      // Here you would make an API call to update the backend
    },
    [updateMemberRole]
  );

  const handleRemoveMember = useCallback(
    async (memberId: string) => {
      removeMember(memberId);
      // Here you would make an API call to update the backend
    },
    [removeMember]
  );

  const handleInvite = useCallback(
    async (email: string, role: UserRole) => {
      // Here you would make an API call to send the invitation
      const newMember = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email,
        role,
        lastActive: new Date().toISOString(),
      };
      addMember(newMember);
    },
    [addMember]
  );

  // Initialize with mock data if empty
  if (members.length === 0) {
    useTeamStore.getState().setMembers(mockTeamMembers);
  }
  if (!organization) {
    useTeamStore.getState().setOrganization(mockOrganization);
  }

  return {
    members,
    organization,
    updateRole: handleUpdateRole,
    removeMember: handleRemoveMember,
    inviteMember: handleInvite,
  };
}
