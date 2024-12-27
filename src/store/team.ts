import { create } from 'zustand';
import { TeamMember, Organization, UserRole } from '../types/team';

interface TeamStore {
  members: TeamMember[];
  organization: Organization | null;
  setMembers: (members: TeamMember[]) => void;
  setOrganization: (org: Organization) => void;
  updateMemberRole: (memberId: string, role: UserRole) => void;
  removeMember: (memberId: string) => void;
  addMember: (member: TeamMember) => void;
}

export const useTeamStore = create<TeamStore>((set) => ({
  members: [],
  organization: null,
  setMembers: (members) => set({ members }),
  setOrganization: (organization) => set({ organization }),
  updateMemberRole: (memberId, role) =>
    set((state) => ({
      members: state.members.map((member) =>
        member.id === memberId ? { ...member, role } : member
      ),
    })),
  removeMember: (memberId) =>
    set((state) => ({
      members: state.members.filter((member) => member.id !== memberId),
    })),
  addMember: (member) =>
    set((state) => ({
      members: [...state.members, member],
    })),
}));
