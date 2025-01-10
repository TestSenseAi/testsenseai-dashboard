import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/react';
import { CoverageData } from '../../types/analytics';

interface CoverageOverviewProps {
  data: CoverageData;
}

export function CoverageOverview({ data }: CoverageOverviewProps) {
  const coverageChange =
    data.trend[data.trend.length - 1].coverage - data.trend[data.trend.length - 2].coverage;

  return (
    <Card bg='gray.800'>
      <CardHeader>
        <Heading size='md'>Coverage Overview</Heading>
      </CardHeader>
      <CardBody>
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
          <Stat>
            <StatLabel>Total Coverage</StatLabel>
            <StatNumber>{data.percentage.toFixed(1)}%</StatNumber>
            <StatHelpText>
              <StatArrow type={coverageChange >= 0 ? 'increase' : 'decrease'} />
              {Math.abs(coverageChange).toFixed(1)}%
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>UI Tests</StatLabel>
            <StatNumber>{data.byType.ui}%</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>API Tests</StatLabel>
            <StatNumber>{data.byType.api}%</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Visual Tests</StatLabel>
            <StatNumber>{data.byType.visual}%</StatNumber>
          </Stat>
        </SimpleGrid>
      </CardBody>
    </Card>
  );
}
