import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const navigate = useNavigate();
  const name = useRef(null)


  const handleSubmit = async(e) => {
    e.preventDefault();
  try {

   const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/category/create", {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({name:name.current.value}),
      });

      const data = await res.json();
      console.log("data")

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }
      alert("✅ category added successfully");
      navigate("/admin/categories")
     name.current.value = "";

    } catch (error) {
      console.error(error);
    }
  };




  return (
    <div className="max-w-4xl bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Add Category
      </h1>

      <form onSubmit={handleSubmit} className="space-y-2">
        
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Category Name
          </label>
          <input
            type="text"
            name="name"
            required
            ref={name}
           
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800"
          >
            Add Category
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/categories")}
            className="border px-6 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddCategory;
