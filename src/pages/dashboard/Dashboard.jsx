import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/cards/StatCard";
import ProductionChart from "../../components/cards/ProductionChart";
import MonthlyChart from "../../components/cards/MonthlyChart";
import FeedConsumptionChart from "../../components/cards/FeedConsumptionChart";
import KandangPerformance from "../../components/cards/KandangPerformance";
import MonitoringTable from "../../components/tables/MonitoringTable";
import { FaEgg, FaWarehouse, FaHeartbeat, FaLeaf } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import PimpinanDashboard from "./PimpinanDashboard";

function Dashboard() {
  const { user } = useAuth();
  
  const [stats, setStats] = useState({
    totalBebek: 0,
    totalTelur: 0,
    kandangAktif: 0,
    kandangSakit: 0,
  });

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now, we calculate from localStorage data
    const kandangData = JSON.parse(localStorage.getItem("kandangData") || "[]");
    const pakanData = JSON.parse(localStorage.getItem("smartduck_pakan") || "[]");

    const totalBebek = kandangData.reduce((sum, item) => sum + Number(item.kapasitas), 0);
    const aktif = kandangData.filter(k => k.status === "Aktif").length;
    
    // Simulate some stats based on available data
    setStats({
      totalBebek: totalBebek || 0,
      totalTelur: 0,
      kandangAktif: aktif || 0,
      kandangSakit: 0,
    });
  }, []);

  // Jika role adalah pimpinan, tampilkan dashboard khusus
  if (user?.role === "pimpinan") {
    return <PimpinanDashboard />;
  }

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
              Dashboard SmartDuck
            </h1>

            <p
              className={`
                mt-1 sm:mt-2 text-sm sm:text-base
                ${darkMode ? "text-gray-400" : "text-gray-500"}
              `}
            >
              Ringkasan operasional harian peternakan
            </p>
          </div>

          {/* STATISTIK */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <StatCard
              title="Total Populasi"
              value={stats.totalBebek.toLocaleString()}
              color="text-green-500"
              darkMode={darkMode}
              icon={<FaLeaf className="text-green-500" />}
              subtitle="Ekor Bebek"
            />

            <StatCard
              title="Produksi Hari Ini"
              value={stats.totalTelur.toLocaleString()}
              color="text-orange-500"
              darkMode={darkMode}
              icon={<FaEgg className="text-orange-500" />}
              subtitle="Butir Telur"
            />

            <StatCard
              title="Kandang Aktif"
              value={stats.kandangAktif}
              color="text-blue-500"
              darkMode={darkMode}
              icon={<FaWarehouse className="text-blue-500" />}
              subtitle="Unit Beroperasi"
            />

            <StatCard
              title="Perlu Perhatian"
              value={stats.kandangSakit}
              color="text-red-500"
              darkMode={darkMode}
              icon={<FaHeartbeat className="text-red-500" />}
              subtitle="Kandang Warning"
            />
          </div>

          {/* CHARTS GRID 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
            <ProductionChart darkMode={darkMode} />
            <MonthlyChart darkMode={darkMode} />
          </div>

          {/* CHARTS GRID 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="lg:col-span-2">
              <FeedConsumptionChart darkMode={darkMode} />
            </div>
            <div>
              <KandangPerformance darkMode={darkMode} />
            </div>
          </div>

          {/* TABLE */}
          <MonitoringTable darkMode={darkMode} />
        </>
      )}
    </DashboardLayout>
  );
}

export default Dashboard;
