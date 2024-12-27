import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Switch,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Integration } from '../../types/integration';
import { ConnectionStatus } from './ConnectionStatus';
import { IntegrationForm } from './IntegrationForm';

interface IntegrationCardProps {
  integration: Integration;
  onToggle: (id: string, enabled: boolean) => void;
  onUpdate: (id: string, config: Record<string, string>) => void;
}

export function IntegrationCard({ integration, onToggle, onUpdate }: IntegrationCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Card bg='gray.800' borderWidth={1} borderColor='gray.700'>
      <CardHeader>
        <Flex justify='space-between' align='center'>
          <Box>
            <Heading size='md'>{integration.name}</Heading>
            <Text color='gray.400' mt={1}>
              {integration.description}
            </Text>
          </Box>
          <Flex align='center' gap={4}>
            <ConnectionStatus status={integration.status} error={integration.error} />
            <Switch
              isChecked={integration.isEnabled}
              onChange={(e) => onToggle(integration.id, e.target.checked)}
              colorScheme='brand'
            />
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody pt={0}>
        <Flex justify='space-between' align='center'>
          {integration.lastSync && (
            <Text fontSize='sm' color='gray.400'>
              Last synced: {new Date(integration.lastSync).toLocaleString()}
            </Text>
          )}
          <Button size='sm' variant='outline' onClick={onOpen} isDisabled={!integration.isEnabled}>
            Configure
          </Button>
        </Flex>
        <IntegrationForm
          isOpen={isOpen}
          onClose={onClose}
          integration={integration}
          onUpdate={onUpdate}
        />
      </CardBody>
    </Card>
  );
}
