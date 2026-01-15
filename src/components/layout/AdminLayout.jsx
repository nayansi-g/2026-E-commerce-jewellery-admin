
import Sidebar from "../layout/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
     <div className="px-3 py-4 bg-gray-50"> <Sidebar /></div>

      <div className="flex flex-col flex-1">
        {/* <Navbar /> */}
        <main className="p-4 bg-gray-50 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
