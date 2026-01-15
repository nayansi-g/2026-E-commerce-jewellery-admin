import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  LogOut,
} from "lucide-react";
import Navbar from "../layout/Navbar";

const Sidebar = () => {
  const baseLink =
    "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all";

  const activeLink =
    "bg-gray-900 text-white shadow";

  const inactiveLink =
    "text-gray-700 hover:bg-gray-100";

  return (
    <aside className="w-64 bg-white border border-gray-200 rounded-xl h-[95vh] flex flex-col">
      
      {/* Header */}
      <div className="px-4 py-3 border-b flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">
          Admin Panel
        </h2>
        {/* <Navbar /> */}
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink}`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink}`
          }
        >
          <Package className="w-5 h-5" />
          Products
        </NavLink>

        <NavLink
          to="/admin/categories"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink}`
          }
        >
          <Layers className="w-5 h-5" />
          Categories
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink}`
          }
        >
          <ShoppingBag className="w-5 h-5" />
          Orders
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t">
        <button className="flex items-center gap-3 text-sm text-red-600 hover:bg-red-50 w-full px-3 py-2 rounded-lg">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
