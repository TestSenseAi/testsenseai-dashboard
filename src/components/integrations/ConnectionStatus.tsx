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

  const Icon = statusConfig[status].icon;
  const Text = statusConfig[status].text;

  return (
    <Tooltip label={error || ''} isDisabled={!error}>
      <Badge
        display='flex'
        alignItems='center'
        gap={2}
        colorScheme={statusConfig[status].color}
        px={2}
        py={1}
        borderRadius='full'>
        <Icon size={14} />
        <span className='text-sm'>{Text}</span>
      </Badge>
    </Tooltip>
  );
}
