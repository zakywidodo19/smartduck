import { createContext, useContext, useState, useEffect } from "react";
import { demoUsers, rolePermissions } from "../data/users";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("smartduck_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("smartduck_user");
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const found = demoUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (found) {
      const userData = {
        id: found.id,
        name: found.name,
        email: found.email,
        role: found.role,
        avatar: found.avatar,
      };
      setUser(userData);
      localStorage.setItem("smartduck_user", JSON.stringify(userData));
      // Keep legacy key for backward compat
      localStorage.setItem("isLogin", "true");
      return { success: true, user: userData };
    }

    return { success: false, message: "Email atau password salah" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("smartduck_user");
    localStorage.removeItem("isLogin");
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    const perms = rolePermissions[user.role];
    return perms ? perms[permission] === true : false;
  };

  const getRoleLabel = () => {
    if (!user) return "";
    const perms = rolePermissions[user.role];
    return perms ? perms.label : user.role;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    hasPermission,
    getRoleLabel,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
