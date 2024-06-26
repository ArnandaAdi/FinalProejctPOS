import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatCurrency } from "../utils/FormatCurrency";

const TransactionDetail = () => {
  const { id } = useParams();
  const [transactionDetails, setTransactionDetails] = useState([]);
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactionDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/pos/api/listtransaksidetail/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setTransaction(data);
          setTransactionDetails(data.transactionDetails);
        } else {
          setError("Failed to fetch transaction detail");
        }
      } catch (error) {
        setError(`Error fetching transaction detail: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTransactionDetail();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!transaction) {
    return <div>Transaction not found.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Transaction Detail</h2>
      <div>
        <p>
          <strong>Transaction ID:</strong> {transaction.transaction_id}
        </p>
        <p>
          <strong>Transaction Date:</strong>{" "}
          {new Date(transaction.transaction_date).toLocaleDateString()}
        </p>
        <p>
          <strong>Total Price:</strong>{" "}
          {formatCurrency(transaction.total_amount)}
        </p>
        <p>
          <strong>Total Paid:</strong> {formatCurrency(transaction.total_pay)}
        </p>
      </div>
      <div className="mt-4">
        <h3 className="text-lg mb-2">Product Details:</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactionDetails.map((detail) => (
              <tr key={detail.product_id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {detail.product_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {detail.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatCurrency(detail.sub_total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionDetail;
