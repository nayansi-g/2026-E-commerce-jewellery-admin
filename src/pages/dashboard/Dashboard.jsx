import { useEffect, useState } from "react";
import {
  Package,
  Layers,
  ShoppingBag,
  Users,
} from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    orders: 0,
    users: 0,
  });

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchDashboardData = async () => {
      try {
        const [pRes, cRes, oRes, uRes] = await Promise.all([
          fetch("http://localhost:5000/product", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("http://localhost:5000/category", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("http://localhost:5000/order", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("http://localhost:5000/user", { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        const products = await pRes.json();
        const categories = await cRes.json();
        const ordersData = await oRes.json();
        const users = await uRes.json();

        setStats({
          products: products.length,
          categories: categories.length,
          orders: ordersData.length,
          users: users.length,
        });

        setOrders(ordersData.slice(0, 5)); // latest 5 orders
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Store performance overview
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Products" value={stats.products} icon={Package} />
        <StatCard title="Categories" value={stats.categories} icon={Layers} />
        <StatCard title="Orders" value={stats.orders} icon={ShoppingBag} />
        <StatCard title="Users" value={stats.users} icon={Users} />
      </div>

      {/* Recent Orders */}
      <div className="bg-white border rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Orders
        </h2>

        {loading ? (
          <p className="text-sm text-gray-400">Loading orders...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-2">Order ID</th>
                  <th className="py-2">Customer</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b last:border-none">
                    <td className="py-2 font-medium">
                      #{order._id.slice(-6)}
                    </td>
                    <td className="py-2">
                      {order.user?.name || "Guest"}
                    </td>
                    <td className="py-2">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="py-2 font-semibold">
                      ₹{order.totalAmount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;


const StatCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="relative bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">
      <div className="absolute top-4 right-4 bg-gray-100 p-2 rounded-lg">
        <Icon className="w-5 h-5 text-gray-700" />
      </div>

      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-3xl font-bold text-gray-900 mt-2">
        {value}
      </h3>
    </div>
  );
};


const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 text-xs rounded-full font-medium ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
};
