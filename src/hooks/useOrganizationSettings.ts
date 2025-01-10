import { useState, useEffect } from 'react';
import { OrganizationSettings } from '../types/organization';

const defaultSettings: OrganizationSettings = {
  general: {
    defaultTimezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    language: 'en',
    notificationEmail: '',
  },
  projects: {
    defaultVisibility: 'private',
    requireApproval: true,
    maxProjects: 100,
    archiveAfterDays: 90,
  },
  security: {
    authentication: {
      requireMFA: true,
      mfaMethods: ['authenticator'],
      passwordPolicy: {
        minLength: 12,
        requireNumbers: true,
        requireSymbols: true,
        requireUppercase: true,
        expiryDays: 90,
      },
      sso: {
        enabled: false,
        provider: undefined,
        enforced: false,
        domains: [],
      },
    },
    sessions: {
      maxConcurrent: 5,
      timeout: 30,
      requireReauthFor: ['billing', 'security'],
    },
    access: {
      ipWhitelist: [],
      allowedCountries: [],
      restrictOutsideAccess: false,
    },
    audit: {
      enabled: true,
      retentionDays: 90,
      logTypes: ['auth', 'billing', 'projects'],
    },
  },
  billing: {
    plan: {
      id: 'pro',
      name: 'Professional',
      price: 99,
      interval: 'monthly',
      features: [],
    },
    subscription: {
      status: 'active',
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      cancelAtPeriodEnd: false,
    },
    payment: {
      method: 'card',
      last4: '4242',
      expiryMonth: 12,
      expiryYear: 2024,
    },
    usage: {
      users: 5,
      storage: 25,
      apiCalls: 50000,
      projects: 10,
    },
    limits: {
      maxUsers: 10,
      maxStorage: 50,
      maxApiCalls: 100000,
      maxProjects: 20,
    },
  },
  teams: {
    allowTeamCreation: true,
    maxTeamSize: 5,
    requireTeamLead: true,
    autoJoinDomain: true,
  },
  collaboration: {
    allowExternalSharing: true,
    allowGuestAccess: true,
    restrictDomains: true,
    allowedDomains: [],
  },
};

export function useOrganizationSettings() {
  const [settings, setSettings] = useState<OrganizationSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        // In a real app, fetch from API
        // const response = await api.getOrganizationSettings();
        // setSettings(response.data);
        setSettings(defaultSettings);
      } catch (error) {
        console.error('Failed to load organization settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const updateSettings = async (section: string, values: any) => {
    try {
      // In a real app, update via API
      // await api.updateOrganizationSettings(section, values);
      setSettings((prev) => ({
        ...prev,
        [section]: {
          ...prev[section as keyof OrganizationSettings],
          ...values,
        },
      }));
    } catch (error) {
      throw new Error('Failed to update settings');
    }
  };

  return {
    settings,
    updateSettings,
    loading,
  };
}
