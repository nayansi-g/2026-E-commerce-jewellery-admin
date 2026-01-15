import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch all products
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch("https://two026-e-commerce-jewellery-admin.onrender.com/category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to fetch products");
        return;
      }

      setCategories(data.getAllCategory || data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete product
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://two026-e-commerce-jewellery-admin.onrender.com/category/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Delete failed");
        return;
      }

      alert("✅ Category deleted");
      fetchCategories(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800"> All Categories</h1>

        <button
          onClick={() => navigate("/admin/categories/add")}
          className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800"
        >
          + Add Category
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr className="w-full">
              <th className="px-4 py-3 w-full text-left">Name</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="7" className="px-4 py-6 text-center">
                  Loading...
                </td>
              </tr>
            )}

            {!loading && categories.length === 0 && (
              <tr>
                <td colSpan="7" className="px-4 py-6 text-center text-gray-500">
                  No categories found
                </td>
              </tr>
            )}

            {!loading &&
              categories.map((category) => (
                <div key={category._id} className="border-t flex justify-between items-center px-2">

                  <p className="px-4 py-3">{category.name}</p>

                  {/* Actions */}

                    <button
                      onClick={() => handleDelete(category._id)}
                      className="px-3 h-6 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  
                </div>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryList;
