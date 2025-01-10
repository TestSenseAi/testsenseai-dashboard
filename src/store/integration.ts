import { create } from 'zustand';
import { Integration } from '../types/integration';

interface IntegrationStore {
  integrations: Integration[];
  setIntegrations: (integrations: Integration[]) => void;
  updateIntegration: (id: string, updates: Partial<Integration>) => void;
  toggleIntegration: (id: string, enabled: boolean) => void;
}

export const useIntegrationStore = create<IntegrationStore>((set) => ({
  integrations: [],
  setIntegrations: (integrations) => set({ integrations }),
  updateIntegration: (id, updates) =>
    set((state) => ({
      integrations: state.integrations.map((integration) =>
        integration.id === id ? { ...integration, ...updates } : integration
      ),
    })),
  toggleIntegration: (id, enabled) =>
    set((state) => ({
      integrations: state.integrations.map((integration) =>
        integration.id === id ? { ...integration, isEnabled: enabled } : integration
      ),
    })),
}));
