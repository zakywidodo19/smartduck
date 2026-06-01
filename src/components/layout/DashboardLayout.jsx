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
        flex min-h-screen transition-colors duration-300
        ${darkMode ? "bg-gray-900" : "bg-[#F5F7FA]"}
      `}
    >
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        darkMode={darkMode}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="lg:ml-64 flex-1 min-w-0">
        {/* Navbar */}
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          onMenuClick={() => setSidebarOpen(true)}
          user={user}
        />

        {/* Content */}
        <main className="p-4 sm:p-6">
          {typeof children === "function" ? children(darkMode) : children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
