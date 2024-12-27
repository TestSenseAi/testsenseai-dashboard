import { Badge, Tooltip } from '@chakra-ui/react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface ConnectionStatusProps {
  status: 'connected' | 'disconnected' | 'error';
  error?: string;
}

export function ConnectionStatus({ status, error }: ConnectionStatusProps) {
  const statusConfig = {
    connected: { color: 'green', icon: CheckCircle, text: 'Connected' },
    disconnected: { color: 'gray', icon: XCircle, text: 'Disconnected' },
    error: { color: 'red', icon: AlertTriangle, text: 'Error' },
  };

  const config = statusConfig[status];

  return (
    <Tooltip label={error} isDisabled={!error}>
      <Badge
        display='flex'
        alignItems='center'
        gap={2}
        colorScheme={config.color}
        px={2}
        py={1}
        borderRadius='full'>
        <config.icon size={14} />
        {config.text}
      </Badge>
    </Tooltip>
  );
}
