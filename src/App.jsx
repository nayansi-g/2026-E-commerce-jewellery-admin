
import {Routes,Route, Navigate} from "react-router-dom"
import Login from "./pages/auth/Login"
import AdminLayout from "./components/layout/AdminLayout"
import Dashboard from "./pages/dashboard/Dashboard"
import ProductList from "./pages/products/ProductList"
import AddProduct from "./pages/products/AddProduct"
import EditProduct from "./pages/products/EditProduct"
import CategoryList from "./pages/categories/CategoryList"
import AddCategory from "./pages/categories/AddCategory"
import OrderList from "./pages/orders/OrderList"

function App() {


  return (
    <>
      <Routes>     
       <Route path="/" element={<Navigate to="/admin/login" />} />
         <Route path="/admin/login" element={<Login />} />
        {localStorage.getItem("token")? <Route path="/admin" element={<AdminLayout />}>
        {/* dashboard */}
        <Route path="/admin/dashboard" element={<Dashboard />}/>

        {/* Product routes */}
        <Route path="/admin/products" element={<ProductList />} />
         <Route path="/admin/products/add" element={<AddProduct />}></Route>
         <Route path="/admin/products/edit/:id" element={<EditProduct />}></Route>

         {/* Categories routes */}
         <Route path="/admin/categories" element={<CategoryList />} />
          <Route path="/admin/categories/add" element={<AddCategory />} />

          {/* orderlist route */}
           <Route path="/admin/orders" element={<OrderList />} />

       </Route>:null}
      
     
      </Routes>
    </>
  )
}

export default App
