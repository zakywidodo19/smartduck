import { useState, useEffect } from "react";
import {
  FaHome,
  FaWarehouse,
  FaEgg,
  FaChartBar,
  FaMoneyBillWave,
  FaTimes,
  FaDatabase,
  FaTasks,
  FaFileAlt,
} from "react-icons/fa";
import { GiWheat } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { ChevronDoubleLeftIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

function Sidebar({ isOpen, onClose, sidebarHidden, setSidebarHidden }) {
  const { user, getRoleLabel } = useAuth();

  const location = useLocation();

  const [openMenus, setOpenMenus] = useState({
    operasional: true,
    laporan: false,
    master: false,
  });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const menuGroups = [
    {
      key: "master",
      title: "MASTER DATA",
      icon: <FaDatabase className="mr-2" />,
      menus: [
        {
          title: "Data Kandang",
          path: "/kandang",
          icon: <FaWarehouse />,
          roles: ["admin", "petugas"],
        },
        {
          title: "Data Bebek",
          path: "/bebek",
          icon: <FaEgg />,
          roles: ["admin", "petugas"],
        },
        {
          title: "Harga Pakan",
          path: "/master-harga-pakan",
          icon: <GiWheat />,
          roles: ["admin"],
        },
        {
          title: "Harga Telur",
          path: "/master-harga-telur",
          icon: <FaEgg />,
          roles: ["admin"],
        },
      ],
    },
    {
      key: "operasional",
      title: "OPERASIONAL",
      icon: <FaTasks className="mr-2" />,
      menus: [
        {
          title: "Gudang Pakan",
          path: "/gudang",
          icon: <GiWheat />,
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
      ],
    },
    {
      key: "laporan",
      title: "LAPORAN",
      icon: <FaFileAlt className="mr-2" />,
      menus: [
        {
          title: "Laporan Produksi",
          path: "/laporan",
          icon: <FaChartBar />,
          roles: ["admin", "petugas", "pimpinan"],
        },
        {
          title: "Laporan Keuangan",
          path: "/keuangan",
          icon: <FaMoneyBillWave />,
          roles: ["admin", "pimpinan"],
        },
      ],
    },
  ];

  // Auto-open menu group if one of its items is active and close others
  useEffect(() => {
    let activeGroupKey = null;

    menuGroups.forEach((group) => {
      const isGroupActive = group.menus.some((menu) =>
        location.pathname.startsWith(menu.path)
      );
      if (isGroupActive) {
        activeGroupKey = group.key;
      }
    });

    if (activeGroupKey) {
      setOpenMenus({
        operasional: false,
        laporan: false,
        master: false,
        [activeGroupKey]: true,
      });
    }
  }, [location.pathname]);

  return (
    <div
      className={`
        w-64 h-screen bg-green-900 text-white
        fixed top-0 left-0 p-5
        flex flex-col z-50
        transition-all duration-500 ease-in-out

        ${
          isOpen
            ? "translate-x-0"
            : sidebarHidden
              ? "-translate-x-full"
              : "-translate-x-full lg:translate-x-0"
        }
      `}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-orange-400">🦆 SmartDuck</h1>
          <p className="text-xs text-green-200">Monitoring Farm System</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setSidebarHidden(true)}
            className="hidden lg:flex p-2 rounded-lg hover:bg-green-800"
          >
            <ChevronDoubleLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-green-800"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* MENU GROUP */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
        {/* DASHBOARD */}
        <NavLink
          to="/"
          end
          onClick={onClose}
          className={({ isActive }) =>
            `
              flex items-center gap-3
              p-3 rounded-xl mb-5
              transition-all duration-200
              ${isActive ? "bg-green-700 shadow-lg" : "hover:bg-green-800"}
            `
          }
        >
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        {menuGroups.map((group) => {
          const isGroupActive = group.menus.some((menu) =>
            location.pathname.startsWith(menu.path),
          );

          return (
            <div key={group.key} className="mb-5">
              {/* GROUP HEADER */}
              <button
                onClick={() => toggleMenu(group.key)}
                className={`
                  w-full flex items-center justify-between
                  p-3 rounded-xl
                  transition-all
                  mb-2
                  ${
                    isGroupActive
                      ? "bg-green-800 font-bold shadow-md"
                      : "bg-green-800/50 hover:bg-green-800"
                  }
                `}
              >
                <div className="flex items-center">
                  {group.icon}
                  <span className="font-semibold text-sm">{group.title}</span>
                </div>
                {openMenus[group.key] ? (
                  <ChevronUpIcon className="w-4 h-4 transition-transform" />
                ) : (
                  <ChevronDownIcon className="w-4 h-4 transition-transform" />
                )}
              </button>

              {/* SUB MENU */}
              {openMenus[group.key] && (
                <div className="space-y-1">
                  {group.menus
                    .filter((menu) => menu.roles.includes(user?.role))
                    .map((menu) => (
                      <NavLink
                        key={menu.path}
                        to={menu.path}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `
                          flex items-center gap-3
                          py-3 pr-3 pl-10 rounded-xl
                          transition-all duration-200
                          ${
                            isActive
                              ? "bg-green-700 shadow-lg"
                              : "hover:bg-green-800"
                          }
                        `
                        }
                      >
                        <span>{menu.icon}</span>
                        <span>{menu.title}</span>
                      </NavLink>
                    ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* PROFILE */}
      <div className="bg-green-800 p-2 rounded-xl flex items-center gap-3">
        <img
          src={
            user?.avatar ||
            "https://ui-avatars.com/api/?name=User&background=15803d&color=fff"
          }
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
        <div className="min-w-0">
          <h3 className="font-semibold truncate text-sm">
            {user?.name || "User"}
          </h3>

          <p className="text-xs text-green-200 truncate">{getRoleLabel()}</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
