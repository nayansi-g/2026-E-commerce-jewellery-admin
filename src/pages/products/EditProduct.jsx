import { CircleX, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";


const EditProduct =()=>{
    const navigate = useNavigate()
    const {id} = useParams()
    const imgref = useRef(null)

    const [formdata , setFormData] = useState(null)
    const [categories , setCategories] =useState([])

    const fetchCategory = async()=>{
    try {
        const res = await fetch("https://two026-e-commerce-jewellery-backend.onrender.com/category")
        const data = await res.json()
        console.log(data.getAllCategory)
        setCategories(data.getAllCategory)
    } catch (error) {
        console.log(error)
    }
}

const fetchProduct = async()=>{
    try {
        const res = await fetch(`https://two026-e-commerce-jewellery-backend.onrender.com/product/${id}`)
        const data = await res.json()
        console.log(data.getSingleProducts)
        setFormData(data.getSingleProducts)
    } catch (error) {
        console.log(error)
    }
}

const handleChange = (e) =>{
    let {name, value} = e.target; 
    setFormData((prev)=> ({...prev, [name]: value}))
}

useEffect(()=>{
    fetchProduct()
    fetchCategory()
},[id]);


const fetchUpdate = async(e)=>{
    e.preventDefault()
    try {

         const productData = new FormData();

    productData.append("name", formdata.name);
    productData.append("description", formdata.description);
    productData.append("metal", formdata.metal);
    productData.append("purity", formdata.purity);
    productData.append("weight", formdata.weight);
    productData.append("oldprice", formdata.oldprice);
    productData.append("price", formdata.price);
    productData.append("category", formdata.category);
    productData.append("stock", formdata.stock);

  formdata.images.forEach((image) => {
    productData.append("images", image);
  });

          const token = localStorage.getItem("token");
        const res = await fetch(`https://two026-e-commerce-jewellery-backend.onrender.com/product/update/${id}`,{
            method:"PUT",
            headers:{
                Authorization: `Bearer ${token}`,
            },
            body:productData
        })
        const data = await res.json()
        console.log(data.product)
        alert("✅ Product updated successfully");
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
        navigate("/admin/products")


        } catch (error) {
        console.log(error)
    }

}

const removeExistingImg =(index)=>{
        const filteredImg = formdata.images.filter((img,i)=>{
            return index !== i
        })
        setFormData((prev)=>{
            return {...prev, images:filteredImg}
        })
}

const handleImageChange =()=>{
    const files = Array.from(imgref.current.files);
    console.log(files, "Files")
    setFormData({ ...formdata, images: [...formdata.images, ...files] });
}

    return <div>
      <div className="max-w-4xl bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Edit Product
      </h1>

      <form onSubmit={fetchUpdate}  className="space-y-2">
        
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Product Name
          </label>
          <input
          onChange={handleChange}
            type="text"
            name="name"
            required
            value={formdata?.name}
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
            value={formdata?.description}
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
    ref={imgref}
    className="w-full border rounded-md px-3 py-2 hidden"
    onChange={handleImageChange}
  />
    <div className="flex gap-3" >
        {formdata?.images?.map((img,index)=>{
            let imgSrc = typeof img !== "string" ? URL.createObjectURL(img) : `https://two026-e-commerce-jewellery-backend.onrender.com/${img}`;
        return <div className="relative flex gap-2">
           
            <span className="absolute right-0 w-3 -top-2"  onClick={()=>removeExistingImg(index)} ><CircleX className="text-white cursor-pointer bg-red-600 rounded-full " /></span>
            <img width={50} className="border" src={imgSrc} onLoad={() => {
            // cleanup ONLY for new files
            if (typeof img !== "string") {
              URL.revokeObjectURL(imgSrc);
            }
          }} />
        </div>
    })}

    <div onClick={()=>imgref.current.click()} className="flex flex-col  justify-center items-center cursor-pointer">
        <Plus className=" border rounded-full p-1 "/> <span className="text-[12px] text-gray-400">add more</span>
    </div>
    </div>
  {/* Preview (optional but nice) */}
  {/* {formData.images.length > 0 && (
    <p className="text-xs text-gray-500 mt-1">
      {formData.images.length} image(s) selected
    </p>
  )} */}
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
              value={formdata?.metal}
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
              value={formdata?.purity}
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
            onChange={handleChange}
            required
            value={formdata?.weight}
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
              onChange={handleChange}
              required
                value={formdata?.oldprice}
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
              onChange={handleChange}
              required
            value={formdata?.price}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

        </div>

        {/* Category (temporary input) */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Category
          </label>
          <select onChange={handleChange}  value={formdata?.category?._id || formdata?.category || ""}  name="category" className="w-full border rounded-md px-3 py-2" id="">
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
            onChange={handleChange}
             value={formdata?.stock}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800"
          >
            Edit Product
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
    </div>
}

export default EditProduct;
