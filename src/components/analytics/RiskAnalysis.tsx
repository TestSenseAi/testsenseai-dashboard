import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  VStack,
  HStack,
  Text,
  Progress,
  Badge,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { AlertTriangle, ArrowUpRight, CheckCircle } from 'lucide-react';
import { RiskAssessment } from '../../types/analytics';

interface RiskAnalysisProps {
  data: RiskAssessment;
}

export function RiskAnalysis({ data }: RiskAnalysisProps) {
  const riskColors = {
    low: 'green',
    medium: 'orange',
    high: 'red',
  };

  return (
    <Card bg='gray.800'>
      <CardHeader>
        <Heading size='md'>Risk Analysis</Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={6} align='stretch'>
          <HStack justify='space-between'>
            <VStack align='start' spacing={2}>
              <Text>Risk Score</Text>
              <Badge colorScheme={riskColors[data.level]} fontSize='md' px={3} py={1}>
                {data.score}/100
              </Badge>
            </VStack>
            <Progress
              value={data.score}
              colorScheme={riskColors[data.level]}
              size='lg'
              width='60%'
              borderRadius='full'
            />
          </HStack>

          <VStack align='stretch' spacing={4}>
            <Text fontWeight='medium'>Key Risk Factors</Text>
            <List spacing={3}>
              {data.factors.map((factor, index) => (
                <ListItem key={index}>
                  <HStack>
                    <ListIcon
                      as={factor.impact > 7 ? AlertTriangle : ArrowUpRight}
                      color={factor.impact > 7 ? 'red.400' : 'yellow.400'}
                    />
                    <Text flex='1'>{factor.name}</Text>
                    <Badge colorScheme={factor.impact > 7 ? 'red' : 'yellow'}>
                      Impact: {factor.impact}/10
                    </Badge>
                  </HStack>
                </ListItem>
              ))}
            </List>
          </VStack>

          <VStack align='stretch' spacing={4}>
            <Text fontWeight='medium'>Recommendations</Text>
            <List spacing={2}>
              {data.recommendations.map((rec, index) => (
                <ListItem key={index}>
                  <HStack>
                    <ListIcon as={CheckCircle} color='green.400' />
                    <Text>{rec}</Text>
                  </HStack>
                </ListItem>
              ))}
            </List>
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
}
