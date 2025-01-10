import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Progress,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Organization } from '../../types/team';

interface UsageStatsProps {
  organization: Organization;
}

export function UsageStats({ organization }: UsageStatsProps) {
  const { seats, usage } = organization;
  const seatsPercentage = (seats.used / seats.total) * 100;

  return (
    <Card bg='gray.800'>
      <CardHeader>
        <Heading size='md'>Usage & Limits</Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={6} align='stretch'>
          <Box>
            <Text mb={2}>
              Team Seats ({seats.used}/{seats.total})
            </Text>
            <Progress
              value={seatsPercentage}
              colorScheme={seatsPercentage > 80 ? 'orange' : 'brand'}
              borderRadius='full'
              size='sm'
            />
          </Box>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            <Stat>
              <StatLabel>Test Runs</StatLabel>
              <StatNumber>{usage.testRuns.toLocaleString()}</StatNumber>
              <Text fontSize='sm' color='gray.400'>
                This month
              </Text>
            </Stat>
            <Stat>
              <StatLabel>Storage Used</StatLabel>
              <StatNumber>{usage.storage} GB</StatNumber>
              <Text fontSize='sm' color='gray.400'>
                Of 10 GB
              </Text>
            </Stat>
            <Stat>
              <StatLabel>API Calls</StatLabel>
              <StatNumber>{usage.apiCalls.toLocaleString()}</StatNumber>
              <Text fontSize='sm' color='gray.400'>
                This month
              </Text>
            </Stat>
          </SimpleGrid>
        </VStack>
      </CardBody>
    </Card>
  );
}
