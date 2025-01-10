import { Container, VStack } from '@chakra-ui/react';
import { RequirementsReview } from '../components/testing/RequirementsReview';
import { PageHeader } from '../components/common/PageHeader';
import { PageTransition } from '../components/common/PageTransition';

export default function TestRequirements() {
  return (
    <PageTransition>
      <Container maxW='container.xl' py={8}>
        <VStack spacing={8} align='stretch'>
          <PageHeader
            title='Requirements Analysis'
            description='AI-powered analysis and test case generation from requirements'
          />
          <RequirementsReview />
        </VStack>
      </Container>
    </PageTransition>
  );
}
