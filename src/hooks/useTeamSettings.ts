import { useState } from 'react';
import { TeamSettings } from '../types/team';

export function useTeamSettings() {
  const [settings, setSettings] = useState<TeamSettings>({
    require2FA: true,
    ssoEnabled: false,
    allowedDomains: [],
    sessionTimeout: 30,
    ipRestrictions: false,
    deviceManagement: false,
  });

  const updateSetting = (key: keyof TeamSettings, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
    // Here you would make an API call to update the settings
  };

  return { settings, updateSetting };
}
