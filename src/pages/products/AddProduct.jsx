import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    metal: "",
    purity: "",
    weight: "",
    oldprice: "",
    price: "",
    category: "",
    stock: 1,
    images: [],
  });
  const [categories, setCategories] = useState([]);

  const fetchCategories = async ()=>{
    try{
        let res = await fetch("http://localhost:5000/category");
        let data = await res.json();
        setCategories(data.getAllCategory)
    }catch(err){
        console.log(err)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
  try {
      const productData = new FormData();

    productData.append("name", formData.name);
    productData.append("description", formData.description);
    productData.append("metal", formData.metal);
    productData.append("purity", formData.purity);
    productData.append("weight", formData.weight);
    productData.append("oldprice", formData.oldprice);
    productData.append("price", formData.price);
    productData.append("category", formData.category);
    productData.append("stock", formData.stock);

  formData.images.forEach((image) => {
    productData.append("images", image);
  });

   const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/product/admin/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: productData,
      });

      const data = await res.json();
      console.log("data")

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }
      alert("✅ Product added successfully");
     setFormData({
    name: "",
    description: "",
    metal: "",
    purity: "",
    weight: "",
    oldprice: "",
    price: "",
    category: "",
    stock: 1,
    images: [],
  })

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    fetchCategories();
  },[]);


  const handleImageChange = (e) => {
  const files = Array.from(e.target.files);
  setFormData({ ...formData, images: files });
};

  return (
    <div className="max-w-4xl bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Add Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-2">
        
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows="1"
            value={formData.description}
            onChange={handleChange}
            className="w-full resize-none border rounded-md px-3 py-2"
          />
        </div>

              {/* Product Images */}
<div>
  <label className="block text-sm font-medium mb-1">
    Product Images
  </label>

  <input
    type="file"
    name="images"
    multiple
    accept="image/*"
    onChange={handleImageChange}
    className="w-full border rounded-md px-3 py-2"
  />

  {/* Preview (optional but nice) */}
  {formData.images.length > 0 && (
    <p className="text-xs text-gray-500 mt-1">
      {formData.images.length} image(s) selected
    </p>
  )}
</div>


        {/* Metal & Purity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Metal Type
            </label>
            <select
              name="metal"
              required
              value={formData.metal}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">Select Metal</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
            </select>
          </div>

    

          <div>
            <label className="block text-sm font-medium mb-1">
              Purity
            </label>
            <select
              name="purity"
              required
              value={formData.purity}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">Select Purity</option>
              <option value="22K">22K</option>
              <option value="18K">18K</option>
              <option value="925">925</option>
            </select>
          </div>

        </div>

        {/* Weight */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Weight (grams)
          </label>
          <input
            type="number"
            name="weight"
            required
            value={formData.weight}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        {/* Prices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Old Price
            </label>
            <input
              type="number"
              name="oldprice"
              required
              value={formData.oldprice}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Selling Price
            </label>
            <input
              type="number"
              name="price"
              required
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

        </div>

        {/* Category (temporary input) */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Category
          </label>
          <select onChange={handleChange}  name="category" className="w-full border rounded-md px-3 py-2" id="">
            <option> Select Category </option>
            {categories.map(cat=>{
                return <option value={cat._id} >{cat.name}</option>
            })}
          </select>
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800"
          >
            Save Product
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="border px-6 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddProduct;
