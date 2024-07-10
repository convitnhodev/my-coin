import React, { useEffect, useState } from "react";
import { Divider, Table, Tag, notification } from "antd";
import type { ColumnsType } from "antd/lib/table";
import { useAuth } from "../../provider/authContext";
import axiosInstance from "../../configs/axios.config";
import { TransactionData, TransactionHistory } from "../../types/transaction";
import dayjs from "dayjs";

function reverseArray<T>(array: T[]): T[] {
  let reversedArray: T[] = [];
  for (let i = array.length - 1; i >= 0; i--) {
    reversedArray.push(array[i]);
  }
  return reversedArray;
}

const columns: ColumnsType<TransactionHistory> = [
  {
    title: "From",
    dataIndex: "from",
    key: "from",
    render: (text) => (
      <div style={{ width: "250px" }}>
        <a>{text}</a>
      </div>
    ),
  },
  {
    title: "To",
    dataIndex: "to",
    key: "to",
    render: (text) => (
      <div style={{ width: "250px" }}>
        <a>{text}</a>
      </div>
    ),
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Transaction Fee",
    dataIndex: "fee",
    key: "fee",
    render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
  },
  {
    title: "Date Time",
    dataIndex: "createdAt",
    key: "datetime",
    render: (text) => <div>{dayjs(text).format("DD/MM/YYYY H:mm")}</div>,
  },
  {
    title: "Balance",
    dataIndex: "balance",
    key: "newBalance",
  },
  {
    title: "Type",
    key: "type",
    dataIndex: "type",
    render: (status) => {
      let color = "green";
      if (status === "Buy") {
        color = "orange";
      } else if (status === "Send") {
        color = "red";
      }
      return (
        <Tag color={color} key={status}>
          {status.toUpperCase()}
        </Tag>
      );
    },
  },
];

function determineTransactionType(
  transaction: TransactionData,
  walletAddress: string
): string {
  let type: string = "Send";
  if (transaction.data.from === "system") {
    type = "Buy";
  } else if (transaction.data.to === walletAddress) {
    type = "Receive";
  }
  return type;
}

function calculateTransactions(
  transactionsData: TransactionData[],
  walletAddress: string
): TransactionHistory[] {
  console.log("transactionsData: ", transactionsData);
  let currentBalance: number = 0;
  let transactions: TransactionHistory[] = [];

  for (let i = 0; i < transactionsData.length; i++) {
    const transactionData = transactionsData[i];
    const type: string = determineTransactionType(
      transactionData,
      walletAddress
    );

    if (type === "Send") {
      currentBalance -= transactionData.data.amount;
      if (transactionData.data.fee) currentBalance -= transactionData.data.fee;
    } else if (type === "Receive") {
      currentBalance += transactionData.data.amount;
    } else if (type === "Buy") {
      currentBalance += transactionData.data.amount;
    }

    const transaction: TransactionHistory = {
      createdAt: transactionData.createdAt,
      from:
        transactionData.data.from == walletAddress
          ? "My wallet"
          : transactionData.data.from,
      to:
        transactionData.data.to == walletAddress
          ? "My wallet"
          : transactionData.data.to,
      amount: transactionData.data.amount,
      fee: transactionData.data.fee,
      balance: currentBalance,
      type: type,
    };

    transactions.push(transaction);
  }

  console.log("transactions", transactions);
  return transactions;
}

const HistoryPage: React.FC = () => {
  const { getWalletAddress } = useAuth();
  const walletAddress = getWalletAddress();

  const [transactions, setTransactions] = useState<TransactionHistory[]>([]);

  const fetcHistory = async () => {
    console.log("helloooo");
    try {
      const bodyRequest = {
        address: walletAddress,
      };

      let result = await axiosInstance.get("/transactions", {
        params: bodyRequest,
      });

      if (result.data.statusCode !== 200) {
        notification.error({
          message: "Failed to get Transactions",
        });

        return;
      }

      if (walletAddress) {
        const transactionsHistory = calculateTransactions(
          result.data.data,
          walletAddress
        );
        setTransactions(transactionsHistory);
      }

      console.log(result.data);
    } catch (error) {
      notification.error({
        message: "Failed to get Transactions",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    fetcHistory();
  }, []);

  return (
    <>
      <h1>History</h1>
      <Divider />
      <Table
        columns={columns}
        dataSource={reverseArray<TransactionHistory>(transactions)}
      />
    </>
  );
};

export default HistoryPage;
