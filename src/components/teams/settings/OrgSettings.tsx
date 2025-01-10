import { Card, CardHeader, CardBody, Heading, VStack } from '@chakra-ui/react';
import { PlanSettings } from './PlanSettings';
import { SecuritySettings } from './SecuritySettings';
import { BillingSettings } from './BillingSettings';
export function OrgSettings() {
  return (
    <Card bg='gray.800'>
      <CardHeader>
        <Heading size='md'>Organization Settings</Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={6} align='stretch'>
          <PlanSettings />
          <SecuritySettings />
          <BillingSettings />
        </VStack>
      </CardBody>
    </Card>
  );
}
