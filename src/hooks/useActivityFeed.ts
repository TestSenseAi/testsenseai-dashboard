import { useState, useEffect } from 'react';
import { Activity, ActivityFilterType } from '../components/activity/types';
import { websocketService } from '../services/websocket';
import { mockActivities } from '../test/MockedData/mockData';

export function useActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filter, setFilter] = useState<ActivityFilterType>('all');

  useEffect(() => {
    // Initialize with mock data
    setActivities(mockActivities);

    // Connect to WebSocket
    websocketService.connect();

    // Subscribe to new activities
    const unsubscribe = websocketService.subscribe((newActivity) => {
      setActivities((prev) => [newActivity, ...prev].slice(0, 50)); // Keep last 50 activities
    });

    return () => {
      unsubscribe();
      websocketService.disconnect();
    };
  }, []);

  // Apply filters
  const filteredActivities = activities.filter((activity) => {
    switch (filter) {
      case 'tests':
        return activity.type.startsWith('test-');
      case 'cases':
        return activity.type.startsWith('case-');
      case 'ci':
        return ['branch-merged', 'deployment-started', 'deployment-completed'].includes(
          activity.type
        );
      case 'alerts':
        return ['alert-triggered', 'performance-degraded'].includes(activity.type);
      case 'security':
        return activity.type === 'security-scan-completed';
      default:
        return true;
    }
  });

  return { activities: filteredActivities, filter, setFilter };
}
