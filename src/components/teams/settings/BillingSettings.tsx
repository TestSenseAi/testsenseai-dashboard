import { Box, Heading, Text, Button, SimpleGrid, Card, CardBody } from '@chakra-ui/react';
import { CreditCard } from 'lucide-react';

export function BillingSettings() {
  return (
    <Box>
      <Heading size='sm' mb={4}>
        Billing & Payment
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <Card variant='outline'>
          <CardBody>
            <Box display='flex' alignItems='center' gap={3}>
              <CreditCard size={20} />
              <Box>
                <Text fontWeight='medium'>Payment Method</Text>
                <Text fontSize='sm' color='gray.400'>
                  Visa ending in 4242
                </Text>
              </Box>
            </Box>
            <Button size='sm' variant='ghost' mt={4}>
              Update Payment Method
            </Button>
          </CardBody>
        </Card>

        <Card variant='outline'>
          <CardBody>
            <Text fontWeight='medium'>Next Invoice</Text>
            <Text fontSize='sm' color='gray.400' mb={2}>
              Due March 1, 2024
            </Text>
            <Text fontSize='xl' fontWeight='bold'>
              $99.00
            </Text>
            <Button size='sm' variant='ghost' mt={4}>
              View Invoice History
            </Button>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
}
