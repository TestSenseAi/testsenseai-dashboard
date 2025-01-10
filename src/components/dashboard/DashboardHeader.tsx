import { Flex, Heading, Button, ButtonGroup } from '@chakra-ui/react';
import { Plus, Download } from 'lucide-react';

export function DashboardHeader() {
  return (
    <Flex justify='space-between' align='center' mb={8}>
      <Heading size='lg'>Dashboard</Heading>
      <ButtonGroup spacing={4}>
        <Button leftIcon={<Download size={20} />} variant='ghost'>
          Export Report
        </Button>
        <Button leftIcon={<Plus size={20} />} colorScheme='brand'>
          New Test Run
        </Button>
      </ButtonGroup>
    </Flex>
  );
}
