import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";

import Dashboard from "./pages/dashboard/Dashboard";
import Kandang from "./pages/kandang/Kandang";
import Produksi from "./pages/produksi/Produksi";
import Laporan from "./pages/laporan/Laporan";
import Keuangan from "./pages/keuangan/Keuangan";
import Pakan from "./pages/pakan/Pakan";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter basename="/smartduck/">
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/kandang"
              element={
                <ProtectedRoute allowedRoles={["admin", "petugas"]}>
                  <Kandang />
                </ProtectedRoute>
              }
            />



            <Route
              path="/pakan"
              element={
                <ProtectedRoute allowedRoles={["admin", "petugas"]}>
                  <Pakan />
                </ProtectedRoute>
              }
            />

            <Route
              path="/produksi"
              element={
                <ProtectedRoute allowedRoles={["admin", "petugas"]}>
                  <Produksi />
                </ProtectedRoute>
              }
            />

            <Route
              path="/laporan"
              element={
                <ProtectedRoute>
                  <Laporan />
                </ProtectedRoute>
              }
            />

            <Route
              path="/keuangan"
              element={
                <ProtectedRoute>
                  <Keuangan />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
