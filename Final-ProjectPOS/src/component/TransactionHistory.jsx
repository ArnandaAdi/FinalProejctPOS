import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/FormatCurrency";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/pos/api/listtransactions"
        );
        if (response.ok) {
          const data = await response.json();
          setTransactions(data);
        } else {
          console.error("Failed to fetch transactions");
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Transaction History</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Transaction Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Transaction ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Paid
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {transaction.transaction_date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{transaction.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatCurrency(transaction.total_amount)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatCurrency(transaction.total_pay)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link
                  to={`/transaction/${transaction.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Transaction Detail
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
