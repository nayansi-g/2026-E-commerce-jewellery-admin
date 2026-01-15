import { useEffect, useState } from "react";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setOrders(data);
    setLoading(false);
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="p-3 border">Order ID</th>
              <th className="p-3 border">Customer</th>
              <th className="p-3 border">Amount</th>
              <th className="p-3 border">Payment</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="text-sm text-center">
                <td className="p-3 border">{order._id.slice(-6)}</td>
                <td className="p-3 border">
                  {order.user?.name || "Guest"}
                </td>
                <td className="p-3 border">₹{order.totalAmount}</td>
                <td className="p-3 border">
                  <span className={`px-2 py-1 rounded text-xs
                    ${order.paymentStatus === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"}
                  `}>
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="p-3 border">{order.orderStatus}</td>
                <td className="p-3 border">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
