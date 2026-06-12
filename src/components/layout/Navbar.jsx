import { FaMoon, FaSun, FaBars } from "react-icons/fa";

import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import NotificationDropdown from "./NotificationDropdown";

function Navbar({
  darkMode,
  toggleDarkMode,
  onMenuClick,
  sidebarHidden,
  setSidebarHidden,
}) {
  const navigate = useNavigate();
  const { user, logout, getRoleLabel } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className={`
        px-4 sm:px-6 py-3 sm:py-4 shadow-sm
        flex justify-between items-center
        transition-colors duration-300 sticky top-0 z-30
        ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}
      `}
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        {sidebarHidden && (
          <button
            onClick={() => setSidebarHidden(false)}
            className={`
        hidden lg:flex
        p-2 rounded-xl
        ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}
      `}
          >
            <ChevronDoubleRightIcon className="w-5 h-5" />
          </button>
        )}

        <div>
          <h2
            className={`
        text-lg sm:text-2xl font-bold
        ${darkMode ? "text-white" : "text-gray-800"}
      `}
          >
            Dashboard
          </h2>

          <p
            className={`
        text-xs sm:text-sm hidden sm:block
        ${darkMode ? "text-gray-300" : "text-gray-500"}
      `}
          >
            SmartDuck Monitoring System
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* DARK MODE BUTTON */}
        <button
          onClick={toggleDarkMode}
          className={`
            p-2.5 rounded-xl transition-all duration-200
            ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-yellow-400"
                : "bg-gray-100 hover:bg-gray-200 text-gray-600"
            }
          `}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* NOTIFICATION */}
        <NotificationDropdown darkMode={darkMode} />

        {/* PROFILE */}
        <div className="flex items-center gap-2 sm:gap-3">
          <img
            src={
              user?.avatar ||
              "https://ui-avatars.com/api/?name=User&background=15803d&color=fff"
            }
            alt="profile"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
          />

          <div className="hidden sm:block">
            <h3
              className={`
                font-semibold text-sm
                ${darkMode ? "text-white" : "text-gray-700"}
              `}
            >
              {user?.name || "User"}
            </h3>

            <p
              className={`
                text-xs
                ${darkMode ? "text-gray-300" : "text-gray-500"}
              `}
            >
              {getRoleLabel()}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="
              bg-red-500 hover:bg-red-600
              text-white
              px-3 sm:px-4 py-2 rounded-xl
              text-xs sm:text-sm
              transition-colors duration-200
            "
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
