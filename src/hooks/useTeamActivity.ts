import { useState, useEffect } from 'react';
import { TeamActivity, TeamActivityFilter } from '../types/team';

export function useTeamActivity() {
  const [activities, setActivities] = useState<TeamActivity[]>([]);
  const [filter, setFilter] = useState<TeamActivityFilter>('all');

  useEffect(() => {
    // Mock data - replace with API call
    const mockActivities: TeamActivity[] = [
      {
        id: '1',
        type: 'member-invited',
        description: 'Invited new team member sarah@example.com',
        timestamp: new Date().toISOString(),
        performedBy: 'John Doe',
      },
      {
        id: '2',
        type: 'role-updated',
        description: "Updated Bob Wilson's role to Admin",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        performedBy: 'Jane Smith',
      },
    ];

    setActivities(mockActivities);
  }, []);

  const filteredActivities = activities.filter((activity) => {
    if (filter === 'all') return true;
    if (filter === 'members') return ['member-invited', 'member-removed'].includes(activity.type);
    if (filter === 'roles') return activity.type === 'role-updated';
    if (filter === 'settings') return activity.type === 'settings-updated';
    return true;
  });

  return { activities: filteredActivities, filter, setFilter };
}
