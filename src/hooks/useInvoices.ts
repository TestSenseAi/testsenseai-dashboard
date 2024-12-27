import { useState, useEffect } from 'react';
import { Invoice } from '../types/billing';

export function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    // Mock data - replace with API call
    const mockInvoices: Invoice[] = [
      {
        id: '1',
        date: '2024-02-01',
        amount: 99.0,
        status: 'paid',
        pdfUrl: '#',
        viewUrl: '#',
      },
      {
        id: '2',
        date: '2024-01-01',
        amount: 99.0,
        status: 'paid',
        pdfUrl: '#',
        viewUrl: '#',
      },
    ];

    setInvoices(mockInvoices);
  }, []);

  return { invoices };
}
