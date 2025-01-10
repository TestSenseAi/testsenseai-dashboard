import { useState, useEffect } from 'react';
import { SecurityAuditLog } from '../types/security';

export function useSecurityAudit() {
  const [auditLogs, setAuditLogs] = useState<SecurityAuditLog[]>([]);

  useEffect(() => {
    // Mock data - replace with API call
    const mockLogs: SecurityAuditLog[] = [
      {
        id: '1',
        severity: 'high',
        description: 'Failed login attempt from unknown IP',
        timestamp: new Date().toISOString(),
        metadata: { ip: '192.168.1.1', location: 'Unknown' },
      },
      {
        id: '2',
        severity: 'low',
        description: '2FA enabled for user john@example.com',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        metadata: { userId: 'user-123' },
      },
    ];

    setAuditLogs(mockLogs);
  }, []);

  return { auditLogs };
}
