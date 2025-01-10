import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  Input,
  Button,
  Text,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Progress,
  Code,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  IconButton,
  Tooltip,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Search, Copy, Globe, Code as CodeIcon } from 'lucide-react';

interface Locator {
  selector: string;
  type: 'id' | 'class' | 'xpath' | 'css' | 'data-testid';
  element: string;
  score: number;
  unique: boolean;
  stable: boolean;
}

interface LocatorDetectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LocatorDetector({ isOpen, onClose }: LocatorDetectorProps) {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [locators, setLocators] = useState<Locator[]>([]);
  const toast = useToast();

  const handleScan = async () => {
    if (!url) return;

    setIsScanning(true);
    // Simulate scanning
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock locators
    setLocators([
      {
        selector: '#login-form',
        type: 'id',
        element: 'form',
        score: 95,
        unique: true,
        stable: true,
      },
      {
        selector: '[data-testid="submit-button"]',
        type: 'data-testid',
        element: 'button',
        score: 90,
        unique: true,
        stable: true,
      },
      {
        selector: '.user-profile',
        type: 'class',
        element: 'div',
        score: 75,
        unique: false,
        stable: true,
      },
      {
        selector: '//div[contains(@class, "menu-item")]',
        type: 'xpath',
        element: 'div',
        score: 60,
        unique: false,
        stable: false,
      },
    ]);

    setIsScanning(false);
  };

  const handleCopy = (selector: string) => {
    navigator.clipboard.writeText(selector);
    toast({
      title: 'Copied to clipboard',
      status: 'success',
      duration: 2000,
    });
  };

  const generateCode = (locator: Locator) => {
    return `
// Playwright
await page.locator('${locator.selector}').click();

// Cypress
cy.get('${locator.selector}').click();

// Selenium
driver.findElement(By.css('${locator.selector}')).click();
    `.trim();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay />
      <ModalContent bg='gray.800'>
        <ModalHeader>Locator Detection</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={6} align='stretch'>
            <HStack>
              <InputGroup>
                <InputLeftElement>
                  <Globe size={18} />
                </InputLeftElement>
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder='Enter URL or repository link'
                />
              </InputGroup>
              <Button
                leftIcon={<Search size={16} />}
                colorScheme='brand'
                onClick={handleScan}
                isLoading={isScanning}>
                Scan
              </Button>
            </HStack>

            {isScanning && (
              <Box>
                <Text mb={2}>Scanning for locators...</Text>
                <Progress size='sm' isIndeterminate colorScheme='brand' />
              </Box>
            )}

            {locators.length > 0 && (
              <Tabs variant='enclosed'>
                <TabList>
                  <Tab>Table View</Tab>
                  <Tab>Code View</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel px={0}>
                    <Table variant='simple'>
                      <Thead>
                        <Tr>
                          <Th>Selector</Th>
                          <Th>Type</Th>
                          <Th>Element</Th>
                          <Th>Score</Th>
                          <Th>Status</Th>
                          <Th></Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {locators.map((locator, index) => (
                          <Tr key={index}>
                            <Td>
                              <Code>{locator.selector}</Code>
                            </Td>
                            <Td>
                              <Badge>{locator.type}</Badge>
                            </Td>
                            <Td>{locator.element}</Td>
                            <Td>
                              <Badge
                                colorScheme={
                                  locator.score >= 90
                                    ? 'green'
                                    : locator.score >= 70
                                    ? 'yellow'
                                    : 'red'
                                }>
                                {locator.score}%
                              </Badge>
                            </Td>
                            <Td>
                              <HStack>
                                {locator.unique && (
                                  <Tooltip label='Unique selector'>
                                    <Badge colorScheme='green'>Unique</Badge>
                                  </Tooltip>
                                )}
                                {locator.stable && (
                                  <Tooltip label='Stable selector'>
                                    <Badge colorScheme='blue'>Stable</Badge>
                                  </Tooltip>
                                )}
                              </HStack>
                            </Td>
                            <Td>
                              <HStack>
                                <IconButton
                                  aria-label='Copy selector'
                                  icon={<Copy size={16} />}
                                  size='sm'
                                  variant='ghost'
                                  onClick={() => handleCopy(locator.selector)}
                                />
                                <IconButton
                                  aria-label='Copy code'
                                  icon={<CodeIcon size={16} />}
                                  size='sm'
                                  variant='ghost'
                                  onClick={() => handleCopy(generateCode(locator))}
                                />
                              </HStack>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TabPanel>

                  <TabPanel px={0}>
                    <VStack align='stretch' spacing={4}>
                      {locators.map((locator, index) => (
                        <Box key={index} p={4} bg='gray.700' borderRadius='md' position='relative'>
                          <HStack justify='space-between' mb={2}>
                            <Badge>{locator.type}</Badge>
                            <IconButton
                              aria-label='Copy code'
                              icon={<Copy size={16} />}
                              size='sm'
                              variant='ghost'
                              onClick={() => handleCopy(generateCode(locator))}
                            />
                          </HStack>
                          <Code
                            display='block'
                            whiteSpace='pre'
                            p={4}
                            borderRadius='md'
                            fontSize='sm'>
                            {generateCode(locator)}
                          </Code>
                        </Box>
                      ))}
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
