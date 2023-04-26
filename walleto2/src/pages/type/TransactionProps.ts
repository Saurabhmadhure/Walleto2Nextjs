export type Transaction = {
  id: number;
  date: string;
  sendAmount: number;
  receiveAmount: number;
  deposited: number;
  message: string;
  status: string;
  cashback: number;
};

export type TransactionProps = {
  response: Transaction[];
};
