import { useState, useRef, useEffect } from "react";
import { useNotifications } from "../../contexts/NotificationContext";

function NotificationDropdown({ darkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } =
    useNotifications();

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getTypeColor = (type) => {
    switch (type) {
      case "danger":
        return "bg-red-100 text-red-600 border-red-200";
      case "warning":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "info":
        return "bg-blue-100 text-blue-600 border-blue-200";
      case "success":
        return "bg-green-100 text-green-600 border-green-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getTypeDarkColor = (type) => {
    switch (type) {
      case "danger":
        return "bg-red-900/30 text-red-400 border-red-800";
      case "warning":
        return "bg-yellow-900/30 text-yellow-400 border-yellow-800";
      case "info":
        return "bg-blue-900/30 text-blue-400 border-blue-800";
      case "success":
        return "bg-green-900/30 text-green-400 border-green-800";
      default:
        return "bg-gray-800 text-gray-400 border-gray-700";
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative p-2.5 rounded-xl transition-all duration-200
          ${
            darkMode
              ? "hover:bg-gray-700 text-gray-300"
              : "hover:bg-gray-100 text-gray-600"
          }
        `}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>

        {unreadCount > 0 && (
          <span
            className="
              absolute -top-1 -right-1
              bg-red-500 text-white
              text-[10px] font-bold rounded-full
              min-w-[18px] h-[18px]
              flex items-center justify-center
              animate-pulse
            "
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          className={`
            absolute right-0 top-full mt-2
            w-80 sm:w-96 max-h-[480px]
            rounded-2xl shadow-2xl border
            overflow-hidden z-50
            transition-all duration-200
            ${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }
          `}
        >
          {/* Header */}
          <div
            className={`
              px-4 py-3 border-b flex items-center justify-between
              ${darkMode ? "border-gray-700" : "border-gray-100"}
            `}
          >
            <div>
              <h3
                className={`font-semibold text-sm ${darkMode ? "text-white" : "text-gray-800"}`}
              >
                Notifikasi
              </h3>
              {unreadCount > 0 && (
                <p className="text-xs text-gray-500 mt-0.5">
                  {unreadCount} belum dibaca
                </p>
              )}
            </div>

            <div className="flex gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-green-600 hover:text-green-700 font-medium"
                >
                  Baca semua
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs text-red-500 hover:text-red-600 font-medium"
                >
                  Hapus semua
                </button>
              )}
            </div>
          </div>

          {/* Notification List */}
          <div className="overflow-y-auto max-h-[380px]">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <span className="text-4xl mb-3 block">🔔</span>
                <p
                  className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                >
                  Tidak ada notifikasi
                </p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markAsRead(notif.id)}
                  className={`
                    px-4 py-3 border-b cursor-pointer
                    transition-all duration-200
                    ${!notif.read ? (darkMode ? "bg-gray-750" : "bg-green-50/50") : ""}
                    ${
                      darkMode
                        ? "border-gray-700/50 hover:bg-gray-700/50"
                        : "border-gray-50 hover:bg-gray-50"
                    }
                  `}
                >
                  <div className="flex gap-3">
                    {/* Icon */}
                    <div
                      className={`
                        w-10 h-10 rounded-xl flex items-center justify-center
                        text-lg shrink-0 border
                        ${darkMode ? getTypeDarkColor(notif.type) : getTypeColor(notif.type)}
                      `}
                    >
                      {notif.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          className={`
                            text-sm font-semibold truncate
                            ${darkMode ? "text-white" : "text-gray-800"}
                          `}
                        >
                          {notif.title}
                        </h4>
                        {!notif.read && (
                          <span className="w-2 h-2 rounded-full bg-green-500 shrink-0 mt-1.5" />
                        )}
                      </div>

                      <p
                        className={`
                          text-xs mt-0.5 line-clamp-2
                          ${darkMode ? "text-gray-400" : "text-gray-500"}
                        `}
                      >
                        {notif.message}
                      </p>

                      <p className="text-[10px] text-gray-400 mt-1">
                        {notif.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationDropdown;
