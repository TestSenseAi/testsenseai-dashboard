import {
  Box,
  Progress,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';
import { useTeam } from '../../../../hooks/useTeam';

export function UsageMetrics() {
  const { organization } = useTeam();

  if (!organization) return null;

  const { usage } = organization;
  const testRunPercentage = (usage.testRuns / usage.limits.testRuns) * 100;
  const storagePercentage = (usage.storage / usage.limits.storage) * 100;
  const apiPercentage = (usage.apiCalls / usage.limits.apiCalls) * 100;

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
      <Box>
        <Stat mb={2}>
          <StatLabel>Test Runs</StatLabel>
          <StatNumber>{usage.testRuns.toLocaleString()}</StatNumber>
          <StatHelpText>of {usage.limits.testRuns.toLocaleString()}</StatHelpText>
        </Stat>
        <Progress value={testRunPercentage} colorScheme='brand' borderRadius='full' />
      </Box>

      <Box>
        <Stat mb={2}>
          <StatLabel>Storage</StatLabel>
          <StatNumber>{usage.storage} GB</StatNumber>
          <StatHelpText>of {usage.limits.storage} GB</StatHelpText>
        </Stat>
        <Progress value={storagePercentage} colorScheme='brand' borderRadius='full' />
      </Box>

      <Box>
        <Stat mb={2}>
          <StatLabel>API Calls</StatLabel>
          <StatNumber>{usage.apiCalls.toLocaleString()}</StatNumber>
          <StatHelpText>of {usage.limits.apiCalls.toLocaleString()}</StatHelpText>
        </Stat>
        <Progress value={apiPercentage} colorScheme='brand' borderRadius='full' />
      </Box>
    </SimpleGrid>
  );
}
