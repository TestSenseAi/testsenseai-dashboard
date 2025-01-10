import {
  Box,
  VStack,
  Card,
  CardBody,
  Text,
  Textarea,
  Button,
  HStack,
  Progress,
  Badge,
  Icon,
  List,
  ListItem,
  Collapse,
  useDisclosure,
  Divider,
} from '@chakra-ui/react';
import {
  Wand2,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  FileText,
  Brain,
  Target,
  List as ListIcon,
} from 'lucide-react';
import { useState } from 'react';

interface AIAnalysis {
  completeness: {
    score: number;
    missing: string[];
  };
  clarity: {
    score: number;
    suggestions: string[];
  };
  testability: {
    score: number;
    issues: string[];
  };
  recommendations: string[];
  generatedTests: Array<{
    name: string;
    type: 'ui' | 'api' | 'integration';
    description: string;
    priority: 'high' | 'medium' | 'low';
  }>;
}

export function RequirementsReview() {
  const [requirements, setRequirements] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const { isOpen: showTests, onToggle: toggleTests } = useDisclosure();

  const handleAnalyze = async () => {
    if (!requirements.trim()) return;

    setIsAnalyzing(true);
    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setAnalysis({
      completeness: {
        score: 85,
        missing: [
          'Error handling scenarios',
          'Performance requirements',
          'Browser compatibility specifications',
        ],
      },
      clarity: {
        score: 90,
        suggestions: [
          'Add specific success criteria for each requirement',
          'Define acceptance criteria in measurable terms',
        ],
      },
      testability: {
        score: 75,
        issues: ['Some requirements lack verifiable outcomes', 'Edge cases not clearly defined'],
      },
      recommendations: [
        'Break down complex requirements into smaller, testable units',
        'Add specific validation criteria for each feature',
        'Include performance benchmarks and thresholds',
      ],
      generatedTests: [
        {
          name: 'User Authentication Flow',
          type: 'integration',
          description: 'Verify complete login process with validation',
          priority: 'high',
        },
        {
          name: 'Form Validation',
          type: 'ui',
          description: 'Test input validation and error states',
          priority: 'medium',
        },
        {
          name: 'API Integration',
          type: 'api',
          description: 'Verify data persistence and retrieval',
          priority: 'high',
        },
      ],
    });
    setIsAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'green';
    if (score >= 75) return 'yellow';
    return 'red';
  };

  return (
    <Box>
      <VStack spacing={6} align='stretch'>
        <Card>
          <CardBody>
            <VStack spacing={4} align='stretch'>
              <HStack>
                <Icon as={FileText} color='brand.400' />
                <Text fontSize='lg' fontWeight='medium'>
                  Requirements Input
                </Text>
              </HStack>
              <Textarea
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder='Paste your requirements here...'
                rows={8}
                resize='vertical'
              />
              <Button
                leftIcon={<Brain size={16} />}
                colorScheme='purple'
                isLoading={isAnalyzing}
                onClick={handleAnalyze}
                alignSelf='flex-end'>
                Analyze Requirements
              </Button>
            </VStack>
          </CardBody>
        </Card>

        {isAnalyzing && (
          <Card>
            <CardBody>
              <VStack spacing={4} align='stretch'>
                <HStack>
                  <Icon as={Wand2} color='purple.400' />
                  <Text>AI Analysis in Progress</Text>
                </HStack>
                <Progress size='sm' isIndeterminate colorScheme='purple' />
                <Text fontSize='sm' color='gray.400'>
                  Analyzing requirements for completeness, clarity, and testability...
                </Text>
              </VStack>
            </CardBody>
          </Card>
        )}

        {analysis && (
          <>
            <Card>
              <CardBody>
                <VStack spacing={6} align='stretch'>
                  <HStack justify='space-between'>
                    <HStack>
                      <Icon as={Target} color='brand.400' />
                      <Text fontSize='lg' fontWeight='medium'>
                        Analysis Results
                      </Text>
                    </HStack>
                    <Badge
                      colorScheme={getScoreColor(
                        (analysis.completeness.score +
                          analysis.clarity.score +
                          analysis.testability.score) /
                          3
                      )}
                      fontSize='md'
                      px={3}
                      py={1}>
                      Overall Score:{' '}
                      {Math.round(
                        (analysis.completeness.score +
                          analysis.clarity.score +
                          analysis.testability.score) /
                          3
                      )}
                      %
                    </Badge>
                  </HStack>

                  <Box>
                    <Text mb={2}>Completeness ({analysis.completeness.score}%)</Text>
                    <Progress
                      value={analysis.completeness.score}
                      colorScheme={getScoreColor(analysis.completeness.score)}
                      borderRadius='full'
                      mb={2}
                    />
                    {analysis.completeness.missing.length > 0 && (
                      <List spacing={2}>
                        {analysis.completeness.missing.map((item, index) => (
                          <ListItem key={index}>
                            <AlertTriangle size={16} color='yellow.400' />
                            {item}
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </Box>

                  <Box>
                    <Text mb={2}>Clarity ({analysis.clarity.score}%)</Text>
                    <Progress
                      value={analysis.clarity.score}
                      colorScheme={getScoreColor(analysis.clarity.score)}
                      borderRadius='full'
                      mb={2}
                    />
                    {analysis.clarity.suggestions.length > 0 && (
                      <List spacing={2}>
                        {analysis.clarity.suggestions.map((suggestion, index) => (
                          <ListItem key={index}>
                            <AlertTriangle size={16} color='blue.400' />
                            {suggestion}
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </Box>

                  <Box>
                    <Text mb={2}>Testability ({analysis.testability.score}%)</Text>
                    <Progress
                      value={analysis.testability.score}
                      colorScheme={getScoreColor(analysis.testability.score)}
                      borderRadius='full'
                      mb={2}
                    />
                    {analysis.testability.issues.length > 0 && (
                      <List spacing={2}>
                        {analysis.testability.issues.map((issue, index) => (
                          <ListItem key={index}>
                            <AlertTriangle size={16} color='orange.400' />
                            {issue}
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </Box>
                </VStack>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <VStack spacing={4} align='stretch'>
                  <HStack justify='space-between'>
                    <HStack>
                      <Icon as={ListIcon} color='brand.400' />
                      <Text fontSize='lg' fontWeight='medium'>
                        AI Recommendations
                      </Text>
                    </HStack>
                  </HStack>

                  <List spacing={3}>
                    {analysis.recommendations.map((recommendation, index) => (
                      <ListItem key={index}>
                        <CheckCircle size={16} color='green.400' />
                        {recommendation}
                      </ListItem>
                    ))}
                  </List>

                  <Divider />

                  <HStack justify='space-between' onClick={toggleTests} cursor='pointer'>
                    <Text fontWeight='medium'>Suggested Test Cases</Text>
                    <Icon as={showTests ? ChevronDown : ChevronRight} />
                  </HStack>

                  <Collapse in={showTests}>
                    <VStack align='stretch' spacing={3}>
                      {analysis.generatedTests.map((test, index) => (
                        <Box
                          key={index}
                          p={4}
                          bg='gray.700'
                          borderRadius='md'
                          borderWidth={1}
                          borderColor='gray.600'>
                          <HStack justify='space-between' mb={2}>
                            <Text fontWeight='medium'>{test.name}</Text>
                            <HStack spacing={2}>
                              <Badge>{test.type}</Badge>
                              <Badge
                                colorScheme={
                                  test.priority === 'high'
                                    ? 'red'
                                    : test.priority === 'medium'
                                    ? 'yellow'
                                    : 'green'
                                }>
                                {test.priority}
                              </Badge>
                            </HStack>
                          </HStack>
                          <Text color='gray.400'>{test.description}</Text>
                        </Box>
                      ))}
                    </VStack>
                  </Collapse>

                  <Button
                    colorScheme='brand'
                    onClick={() => {
                      // Handle test generation
                    }}>
                    Generate Test Cases
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          </>
        )}
      </VStack>
    </Box>
  );
}
