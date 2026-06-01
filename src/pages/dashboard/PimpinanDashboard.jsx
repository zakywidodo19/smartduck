import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/cards/StatCard";
import ProductionChart from "../../components/cards/ProductionChart";
import MonthlyChart from "../../components/cards/MonthlyChart";
import KandangPerformance from "../../components/cards/KandangPerformance";
import { FaEgg, FaChartLine, FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

function PimpinanDashboard() {
  const { user } = useAuth();
  
  const [stats, setStats] = useState({
    totalProduksiBulanan: 0,
    rataRataPerforma: 0,
    totalPendapatan: 0,
  });

  useEffect(() => {
    // Simulasi pengambilan data analitik untuk pimpinan
    setStats({
      totalProduksiBulanan: 0,
      rataRataPerforma: 0,
      totalPendapatan: 0,
    });
  }, []);

  return (
    <DashboardLayout>
      {(darkMode) => (
        <>
          {/* HEADER */}
          <div className="mb-6 sm:mb-8">
            <h1
              className={`
                text-2xl sm:text-3xl font-bold
                ${darkMode ? "text-white" : "text-gray-800"}
              `}
            >
              Selamat Datang, {user?.name || "Pimpinan"}
            </h1>

            <p
              className={`
                mt-1 sm:mt-2 text-sm sm:text-base
                ${darkMode ? "text-gray-400" : "text-gray-500"}
              `}
            >
              Ringkasan Eksekutif Performa Peternakan SmartDuck
            </p>
          </div>

          {/* STATISTIK UTAMA (EXECUTIVE SUMMARY) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <StatCard
              title="Produksi Bulan Ini"
              value={`${stats.totalProduksiBulanan.toLocaleString()} Butir`}
              color="text-orange-500"
              darkMode={darkMode}
              icon={<FaEgg className="text-orange-500" />}
              subtitle="Naik 12% dari bulan lalu"
            />

            <StatCard
              title="Rata-Rata Performa"
              value={`${stats.rataRataPerforma}%`}
              color="text-green-500"
              darkMode={darkMode}
              icon={<FaChartLine className="text-green-500" />}
              subtitle="Status: Sangat Baik"
            />

            <StatCard
              title="Status Operasional"
              value="Optimal"
              color="text-blue-500"
              darkMode={darkMode}
              icon={<FaCheckCircle className="text-blue-500" />}
              subtitle="Semua sistem berjalan normal"
            />
            
            <StatCard
              title="Estimasi Pendapatan"
              value={`Rp ${(stats.totalPendapatan / 1000000).toFixed(1)}Jt`}
              color="text-emerald-500"
              darkMode={darkMode}
              icon={<FaMoneyBillWave className="text-emerald-500" />}
              subtitle="Berdasarkan harga pasar saat ini"
            />
          </div>

          {/* GRAFIK PRODUKSI FULL WIDTH */}
          <div className="mb-6 sm:mb-8">
             <MonthlyChart darkMode={darkMode} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <ProductionChart darkMode={darkMode} />
            <KandangPerformance darkMode={darkMode} />
          </div>

        </>
      )}
    </DashboardLayout>
  );
}

export default PimpinanDashboard;
