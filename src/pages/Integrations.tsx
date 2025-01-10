import { Container, SimpleGrid, VStack } from '@chakra-ui/react';
import { IntegrationCard } from '../components/integrations/IntegrationCard';
import { useIntegrations } from '../hooks/useIntegrations';
import { PageHeader } from '../components/common/PageHeader';

export default function Integrations() {
  const { integrations, toggleIntegration, updateIntegration } = useIntegrations();

  return (
    <Container maxW='container.xl' py={8}>
      <VStack spacing={8} align='stretch'>
        <PageHeader
          title='Integrations'
          description='Connect TestSenseAI with your favorite tools and services'
        />

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
          {integrations.map((integration) => (
            <IntegrationCard
              key={integration.id}
              integration={integration}
              onToggle={toggleIntegration}
              onUpdate={updateIntegration}
            />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
}
