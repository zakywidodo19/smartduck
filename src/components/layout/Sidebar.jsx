import {
  FaHome,
  FaWarehouse,
  FaClipboardList,
  FaEgg,
  FaChartBar,
  FaTimes,
} from "react-icons/fa";
import { GiWheat } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Sidebar({ darkMode, isOpen, onClose }) {
  const { user, getRoleLabel } = useAuth();

  const allMenus = [
    {
      title: "Dashboard",
      path: "/",
      icon: <FaHome />,
      roles: ["admin", "petugas", "pimpinan"],
    },
    {
      title: "Data Kandang",
      path: "/kandang",
      icon: <FaWarehouse />,
      roles: ["admin", "petugas"],
    },
    {
      title: "Monitoring",
      path: "/monitoring",
      icon: <FaClipboardList />,
      roles: ["admin", "petugas", "pimpinan"],
    },
    {
      title: "Manajemen Pakan",
      path: "/pakan",
      icon: <GiWheat />,
      roles: ["admin", "petugas"],
    },
    {
      title: "Produksi Telur",
      path: "/produksi",
      icon: <FaEgg />,
      roles: ["admin", "petugas"],
    },
    {
      title: "Laporan",
      path: "/laporan",
      icon: <FaChartBar />,
      roles: ["admin", "petugas", "pimpinan"],
    },
  ];

  // Filter menus based on user role
  const menus = user
    ? allMenus.filter((menu) => menu.roles.includes(user.role))
    : allMenus;

  return (
    <div
      className={`
        w-64 h-screen bg-green-900 text-white
        fixed top-0 left-0 p-5
        flex flex-col z-50
        transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Header with close button for mobile */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-orange-400">🦆 SmartDuck</h1>
          <p className="text-sm text-green-200 mt-1">Monitoring Farm System</p>
        </div>

        {/* Close button - mobile only */}
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-lg hover:bg-green-800 transition-colors"
        >
          <FaTimes />
        </button>
      </div>

      {/* Menu */}
      <ul className="space-y-2 flex-1">
        {menus.map((menu, index) => (
          <NavLink
            to={menu.path}
            key={index}
            end={menu.path === "/"}
            onClick={onClose}
            className={({ isActive }) =>
              `
                flex items-center gap-3
                p-3 rounded-xl
                cursor-pointer
                transition-all duration-200
                ${
                  isActive
                    ? "bg-green-700 shadow-lg shadow-green-900/50"
                    : "hover:bg-green-800"
                }
              `
            }
          >
            <span className="text-lg">{menu.icon}</span>
            <span className="font-medium">{menu.title}</span>
          </NavLink>
        ))}
      </ul>

      {/* Footer Profile */}
      <div className="bg-green-800 p-4 rounded-xl flex items-center gap-3">
        <img
          src={user?.avatar || "https://ui-avatars.com/api/?name=User&background=15803d&color=fff"}
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
        <div className="min-w-0">
          <h3 className="font-semibold truncate text-sm">
            {user?.name || "User"}
          </h3>
          <p className="text-xs text-green-200 truncate">
            {getRoleLabel()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
