import { Table, Thead, Tbody, Tr, Th, Td, Badge, Button, Icon } from '@chakra-ui/react';
import { Download, ExternalLink } from 'lucide-react';
import { useInvoices } from '../../../../hooks/useInvoices';
import { formatCurrency } from '../../../../utils/format';

export function InvoiceHistory() {
  const { invoices } = useInvoices();

  return (
    <Table variant='simple' size='sm'>
      <Thead>
        <Tr>
          <Th>Date</Th>
          <Th>Amount</Th>
          <Th>Status</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {invoices.map((invoice) => (
          <Tr key={invoice.id}>
            <Td>{new Date(invoice.date).toLocaleDateString()}</Td>
            <Td>{formatCurrency(invoice.amount)}</Td>
            <Td>
              <Badge colorScheme={invoice.status === 'paid' ? 'green' : 'orange'}>
                {invoice.status}
              </Badge>
            </Td>
            <Td>
              <Button size='sm' variant='ghost' leftIcon={<Icon as={Download} />} mr={2}>
                PDF
              </Button>
              <Button size='sm' variant='ghost' leftIcon={<Icon as={ExternalLink} />}>
                View
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
