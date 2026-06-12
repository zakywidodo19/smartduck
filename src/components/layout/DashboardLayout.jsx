import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("smartduck_darkmode");
    return saved === "true";
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // NEW
  const [sidebarHidden, setSidebarHidden] = useState(false);

  const { user } = useAuth();

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      localStorage.setItem("smartduck_darkmode", String(!prev));
      return !prev;
    });
  };

  return (
    <div
      className={`
        flex min-h-screen transition-colors duration-500
        ${darkMode ? "bg-gray-900" : "bg-[#F5F7FA]"}
      `}
    >
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        darkMode={darkMode}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sidebarHidden={sidebarHidden}
        setSidebarHidden={setSidebarHidden}
      />

      <div
        className={`
          flex-1 min-w-0 transition-all duration-300
          ${sidebarHidden ? "lg:ml-0" : "lg:ml-64"}
        `}
      >
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          onMenuClick={() => setSidebarOpen(true)}
          user={user}
          sidebarHidden={sidebarHidden}
          setSidebarHidden={setSidebarHidden}
        />

        <main className="p-4 sm:p-6">
          {typeof children === "function"
            ? children(darkMode)
            : children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;