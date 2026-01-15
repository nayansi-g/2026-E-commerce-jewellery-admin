import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("admin/login");
  };

  return (
    <nav className=" ">

        <button
          onClick={handleLogout}
          className="px-2 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          <LogOut className="w-5" />
        </button>
    </nav>
  );
};

export default Navbar;
