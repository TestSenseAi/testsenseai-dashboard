import {
  VStack,
  SimpleGrid,
  Text,
  Button,
  Card,
  CardBody,
  Progress,
  Badge,
  HStack,
  Icon,
  useToast,
} from '@chakra-ui/react';
import { CreditCard, Download } from 'lucide-react';
import { BillingInfo } from '../../../types/organization';
import { formatCurrency } from '../../../utils/format';

interface BillingSettingsProps {
  billing: BillingInfo;
  onUpdatePlan: (planId: string) => void;
  onUpdatePayment: () => void;
}

export function BillingSettings({ billing, onUpdatePlan, onUpdatePayment }: BillingSettingsProps) {
  const toast = useToast();

  const handleUpdatePayment = () => {
    onUpdatePayment();
    toast({
      title: 'Success',
      description: 'Payment method updated successfully',
      status: 'success',
      duration: 3000,
    });
  };

  return (
    <VStack spacing={6} align='stretch'>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <Card>
          <CardBody>
            <VStack align='stretch' spacing={4}>
              <HStack justify='space-between'>
                <Text fontWeight='medium'>Current Plan</Text>
                <Badge colorScheme='brand'>{billing.plan.name}</Badge>
              </HStack>
              <Text fontSize='2xl' fontWeight='bold'>
                {formatCurrency(billing.plan.price)}/{billing.plan.interval}
              </Text>
              <Button size='sm' colorScheme='brand' onClick={() => onUpdatePlan('upgrade')}>
                Upgrade Plan
              </Button>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <VStack align='stretch' spacing={4}>
              <HStack>
                <Icon as={CreditCard} />
                <Text fontWeight='medium'>Payment Method</Text>
              </HStack>
              {billing.payment.last4 ? (
                <Text>
                  •••• {billing.payment.last4} (expires {billing.payment.expiryMonth}/
                  {billing.payment.expiryYear})
                </Text>
              ) : (
                <Text color='gray.400'>No payment method on file</Text>
              )}
              <Button size='sm' variant='outline' onClick={handleUpdatePayment}>
                Update Payment Method
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>

      <Card>
        <CardBody>
          <VStack align='stretch' spacing={6}>
            <Text fontWeight='medium'>Usage & Limits</Text>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
              <VStack align='stretch'>
                <Text fontSize='sm'>
                  Users ({billing.usage.users}/{billing.limits.maxUsers})
                </Text>
                <Progress
                  value={(billing.usage.users / billing.limits.maxUsers) * 100}
                  colorScheme='brand'
                />
              </VStack>
              <VStack align='stretch'>
                <Text fontSize='sm'>
                  Storage ({billing.usage.storage}/{billing.limits.maxStorage} GB)
                </Text>
                <Progress
                  value={(billing.usage.storage / billing.limits.maxStorage) * 100}
                  colorScheme='brand'
                />
              </VStack>
              <VStack align='stretch'>
                <Text fontSize='sm'>
                  API Calls ({billing.usage.apiCalls}/{billing.limits.maxApiCalls}k)
                </Text>
                <Progress
                  value={(billing.usage.apiCalls / billing.limits.maxApiCalls) * 100}
                  colorScheme='brand'
                />
              </VStack>
              <VStack align='stretch'>
                <Text fontSize='sm'>
                  Projects ({billing.usage.projects}/{billing.limits.maxProjects})
                </Text>
                <Progress
                  value={(billing.usage.projects / billing.limits.maxProjects) * 100}
                  colorScheme='brand'
                />
              </VStack>
            </SimpleGrid>
          </VStack>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <VStack align='stretch' spacing={4}>
            <HStack justify='space-between'>
              <Text fontWeight='medium'>Billing History</Text>
              <Button
                size='sm'
                leftIcon={<Download size={16} />}
                variant='ghost'
                onClick={() => {
                  toast({
                    title: 'Success',
                    description: 'Invoice downloaded successfully',
                    status: 'success',
                    duration: 3000,
                  });
                }}>
                Download All
              </Button>
            </HStack>
            {/* Add billing history table here */}
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );
}
