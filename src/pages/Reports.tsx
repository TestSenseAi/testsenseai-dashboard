import {
  Container,
  VStack,
  SimpleGrid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { PageHeader } from '../components/common/PageHeader';
import { PageTransition } from '../components/common/PageTransition';
import { CustomDashboard } from '../components/analytics/CustomDashboard';
import { FlakynessDetection } from '../components/analytics/insights/FlakynessDetection';
import { PerformanceBenchmark } from '../components/analytics/insights/PerformanceBenchmark';

export default function Reports() {
  return (
    <PageTransition>
      <Container maxW='container.xl' py={8}>
        <VStack spacing={8} align='stretch'>
          <PageHeader
            title='Test Reports & Analytics'
            description='Comprehensive insights and analysis of your test results'
          />

          <Tabs colorScheme='brand'>
            <TabList>
              <Tab>Dashboard</Tab>
              <Tab>Performance</Tab>
              <Tab>Insights</Tab>
            </TabList>

            <TabPanels>
              <TabPanel px={0}>
                <CustomDashboard />
              </TabPanel>

              <TabPanel px={0}>
                <PerformanceBenchmark />
              </TabPanel>

              <TabPanel px={0}>
                <SimpleGrid columns={{ base: 1, lg: 1 }} spacing={6}>
                  <FlakynessDetection />
                </SimpleGrid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </PageTransition>
  );
}
