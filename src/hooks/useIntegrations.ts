import { useCallback } from 'react';
import { useIntegrationStore } from '../store/integration';
import { mockIntegrations } from '../mocks/integrations';

export function useIntegrations() {
  const { integrations, updateIntegration, toggleIntegration } = useIntegrationStore();

  const handleToggle = useCallback(
    async (id: string, enabled: boolean) => {
      toggleIntegration(id, enabled);
      // Here you would typically make an API call to update the backend
    },
    [toggleIntegration]
  );

  const handleUpdate = useCallback(
    async (id: string, config: Record<string, string>) => {
      updateIntegration(id, { config, status: 'connected' });
      // Here you would typically make an API call to update the backend
    },
    [updateIntegration]
  );

  // Initialize with mock data if empty
  if (integrations.length === 0) {
    useIntegrationStore.getState().setIntegrations(mockIntegrations);
  }

  return {
    integrations,
    toggleIntegration: handleToggle,
    updateIntegration: handleUpdate,
  };
}
