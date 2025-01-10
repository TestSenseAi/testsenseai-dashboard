export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  pdfUrl: string;
  viewUrl: string;
}

export interface UsageLimits {
  testRuns: number;
  storage: number;
  apiCalls: number;
}
