import { createContext, useContext, useState, useEffect, useCallback } from "react";

const NotificationContext = createContext(null);

// Helper to generate notifications based on monitoring data
function generateSmartNotifications() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

  const notifications = [
    {
      id: 1,
      type: "warning",
      title: "Suhu Tinggi - Kandang B",
      message: "Suhu kandang B mencapai 33°C, melebihi batas normal (30°C).",
      time: timeStr,
      read: false,
      icon: "🌡️",
    },
    {
      id: 2,
      type: "danger",
      title: "Stok Pakan Menipis",
      message: "Stok pakan tersisa 15kg, segera lakukan pengisian ulang.",
      time: timeStr,
      read: false,
      icon: "🌾",
    },
    {
      id: 3,
      type: "info",
      title: "Produksi Meningkat",
      message: "Produksi telur hari ini naik 12% dibanding kemarin.",
      time: timeStr,
      read: true,
      icon: "🥚",
    },
    {
      id: 4,
      type: "warning",
      title: "Kelembapan Rendah - Kandang D",
      message: "Kelembapan kandang D turun ke 45%, di bawah batas minimum (55%).",
      time: timeStr,
      read: false,
      icon: "💧",
    },
    {
      id: 5,
      type: "danger",
      title: "Kualitas Udara Buruk - Kandang C",
      message: "Kualitas udara kandang C terdeteksi buruk, perlu ventilasi tambahan.",
      time: timeStr,
      read: false,
      icon: "💨",
    },
  ];

  return notifications;
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("smartduck_notifications");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist notifications
  useEffect(() => {
    localStorage.setItem("smartduck_notifications", JSON.stringify(notifications));
  }, [notifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const addNotification = useCallback((notification) => {
    const newNotif = {
      ...notification,
      id: Date.now(),
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const value = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification,
    removeNotification,
    clearAll,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}

export default NotificationContext;
