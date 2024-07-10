export interface TransactionsResponse {
  data: TransactionData[];
  statusCode: number;
  message: string;
  logs: any;
}

export interface TransactionData {
  _id: string;
  prevHash: string;
  hash: string;
  timeStamp: string;
  data: {
    from: string;
    to: string;
    amount: number;
    fee?: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface TransactionHistory {
  from: string;
  to: string;
  amount: number;
  fee?: number;
  createdAt: string;
  balance: number;
  type: string;
}
