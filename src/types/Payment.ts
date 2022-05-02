interface Payment {
  paymentId: number;
  name: string;
  details: string | null | undefined;
  amount: number;
  createdAt: string;
  dueDate: string;
  settledAt: string | null;
  accountId: string;
  teams?: string[];
  teamIds?: string;
}

export default Payment;
