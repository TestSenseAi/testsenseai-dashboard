import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Button,
  Card,
  CardBody,
  Icon,
  Collapse,
  Divider,
  Progress,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';
import {
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Wand2,
  Code,
  Eye,
  FileText,
} from 'lucide-react';
import { useState } from 'react';

interface AIAnalysis {
  score: number;
  coverage: {
    value: number;
    missing: string[];
  };
  quality: {
    value: number;
    issues: Array<{
      type: 'warning' | 'suggestion';
      message: string;
      code?: string;
    }>;
  };
  performance: {
    value: number;
    suggestions: string[];
  };
  maintenance: {
    value: number;
    suggestions: string[];
  };
}

interface AITestReviewProps {
  testCase: {
    id: string;
    name: string;
    type: string;
    steps: Array<{ id: string; action: string }>;
    assertions: Array<{ id: string; condition: string }>;
  };
  analysis: AIAnalysis;
  onApprove: () => void;
  onRegenerate: () => void;
  onEdit: () => void;
}

export function AITestReview({
  testCase,
  analysis,
  onApprove,
  onRegenerate,
  onEdit,
}: AITestReviewProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const { isOpen: showCode, onToggle: toggleCode } = useDisclosure();

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'green';
    if (score >= 60) return 'yellow';
    return 'red';
  };

  return (
    <Box>
      <VStack spacing={6} align='stretch'>
        <Card>
          <CardBody>
            <VStack spacing={4} align='stretch'>
              <HStack justify='space-between'>
                <HStack>
                  <Icon as={Wand2} color='purple.400' />
                  <Text fontSize='lg' fontWeight='medium'>
                    AI Analysis Results
                  </Text>
                </HStack>
                <Badge colorScheme={getScoreColor(analysis.score)} fontSize='md' px={3} py={1}>
                  Score: {analysis.score}/100
                </Badge>
              </HStack>

              <Progress
                value={analysis.score}
                colorScheme={getScoreColor(analysis.score)}
                size='sm'
                borderRadius='full'
              />

              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
                <Stat
                  label='Coverage'
                  value={`${analysis.coverage.value}%`}
                  status={analysis.coverage.value >= 80 ? 'success' : 'warning'}
                />
                <Stat
                  label='Quality'
                  value={`${analysis.quality.value}%`}
                  status={analysis.quality.value >= 80 ? 'success' : 'warning'}
                />
                <Stat
                  label='Performance'
                  value={`${analysis.performance.value}%`}
                  status={analysis.performance.value >= 80 ? 'success' : 'warning'}
                />
                <Stat
                  label='Maintainability'
                  value={`${analysis.maintenance.value}%`}
                  status={analysis.maintenance.value >= 80 ? 'success' : 'warning'}
                />
              </SimpleGrid>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <VStack spacing={4} align='stretch'>
              <HStack
                justify='space-between'
                cursor='pointer'
                onClick={() =>
                  setExpandedSection(expandedSection === 'coverage' ? null : 'coverage')
                }>
                <HStack>
                  <Icon
                    as={expandedSection === 'coverage' ? ChevronDown : ChevronRight}
                    color='gray.400'
                  />
                  <Text fontWeight='medium'>Coverage Analysis</Text>
                </HStack>
                <Badge colorScheme={analysis.coverage.value >= 80 ? 'green' : 'yellow'}>
                  {analysis.coverage.value}%
                </Badge>
              </HStack>

              <Collapse in={expandedSection === 'coverage'}>
                <VStack align='stretch' spacing={3} pl={6}>
                  {analysis.coverage.missing.length > 0 ? (
                    <>
                      <Text color='gray.400'>Missing test coverage for:</Text>
                      {analysis.coverage.missing.map((item, index) => (
                        <HStack key={index}>
                          <Icon as={AlertTriangle} color='yellow.400' />
                          <Text>{item}</Text>
                        </HStack>
                      ))}
                    </>
                  ) : (
                    <HStack>
                      <Icon as={CheckCircle} color='green.400' />
                      <Text>All critical paths are covered</Text>
                    </HStack>
                  )}
                </VStack>
              </Collapse>

              <Divider />

              <HStack
                justify='space-between'
                cursor='pointer'
                onClick={() =>
                  setExpandedSection(expandedSection === 'quality' ? null : 'quality')
                }>
                <HStack>
                  <Icon
                    as={expandedSection === 'quality' ? ChevronDown : ChevronRight}
                    color='gray.400'
                  />
                  <Text fontWeight='medium'>Quality Check</Text>
                </HStack>
                <Badge colorScheme={analysis.quality.value >= 80 ? 'green' : 'yellow'}>
                  {analysis.quality.value}%
                </Badge>
              </HStack>

              <Collapse in={expandedSection === 'quality'}>
                <VStack align='stretch' spacing={3} pl={6}>
                  {analysis.quality.issues.map((issue, index) => (
                    <Box key={index}>
                      <HStack mb={2}>
                        <Icon
                          as={issue.type === 'warning' ? AlertTriangle : Eye}
                          color={issue.type === 'warning' ? 'orange.400' : 'blue.400'}
                        />
                        <Text>{issue.message}</Text>
                      </HStack>
                      {issue.code && (
                        <Box bg='gray.700' p={3} borderRadius='md' fontFamily='mono' fontSize='sm'>
                          <Code>{issue.code}</Code>
                        </Box>
                      )}
                    </Box>
                  ))}
                </VStack>
              </Collapse>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <VStack spacing={4} align='stretch'>
              <Text fontWeight='medium'>Generated Test Case</Text>
              <Button leftIcon={<Code size={16} />} variant='outline' onClick={toggleCode}>
                {showCode ? 'Hide' : 'Show'} Generated Code
              </Button>

              <Collapse in={showCode}>
                <Box
                  bg='gray.700'
                  p={4}
                  borderRadius='md'
                  fontFamily='mono'
                  fontSize='sm'
                  whiteSpace='pre'>
                  {/* Generated test code would go here */}
                  {`describe('${testCase.name}', () => {
  it('should complete successfully', async () => {
    // Test implementation
  });
});`}
                </Box>
              </Collapse>
            </VStack>
          </CardBody>
        </Card>

        <HStack justify='flex-end' spacing={4}>
          <Button leftIcon={<Wand2 size={16} />} variant='outline' onClick={onRegenerate}>
            Regenerate
          </Button>
          <Button leftIcon={<FileText size={16} />} variant='outline' onClick={onEdit}>
            Edit
          </Button>
          <Button leftIcon={<CheckCircle size={16} />} colorScheme='brand' onClick={onApprove}>
            Approve & Save
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}

function Stat({
  label,
  value,
  status,
}: {
  label: string;
  value: string;
  status: 'success' | 'warning';
}) {
  return (
    <Box p={4} bg='gray.700' borderRadius='md'>
      <Text fontSize='sm' color='gray.400' mb={1}>
        {label}
      </Text>
      <HStack>
        <Text fontSize='xl' fontWeight='bold'>
          {value}
        </Text>
        <Icon
          as={status === 'success' ? CheckCircle : AlertTriangle}
          color={status === 'success' ? 'green.400' : 'yellow.400'}
        />
      </HStack>
    </Box>
  );
}
