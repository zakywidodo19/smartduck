import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/cards/StatCard";
import ProductionChart from "../../components/cards/ProductionChart";
import MonthlyChart from "../../components/cards/MonthlyChart";
import FeedConsumptionChart from "../../components/cards/FeedConsumptionChart";
import KandangPerformance from "../../components/cards/KandangPerformance";
import { FaEgg, FaWarehouse, FaHeartbeat, FaLeaf } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import PimpinanDashboard from "./PimpinanDashboard";
import { kandangService } from "../../services/kandangService";
import { pakanService } from "../../services/pakanService";
import { produksiService } from "../../services/produksiService";
import { bebekService } from "../../services/bebekService";

function Dashboard() {
  const { user } = useAuth();
  
  const [stats, setStats] = useState({
    totalBetina: 0,
    totalJantan: 0,
    totalBebekAktual: 0,
    sisaKapasitas: 0,
    totalTelur: 0,
  });

  const [produksiData, setProduksiData] = useState([]);
  const [pakanData, setPakanData]       = useState([]);
  const [kandangList, setKandangList]   = useState([]);
  const [bebekList, setBebekList]       = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [kandang, pakan, produksi, bebek] = await Promise.all([
          kandangService.getAll(),
          pakanService.getAll(),
          produksiService.getAll(),
          bebekService.getAll()
        ]);

        setProduksiData(produksi);
        setPakanData(pakan);
        setKandangList(kandang);
        setBebekList(bebek);

        const today = new Date().toISOString().split("T")[0];
        const safeKandang = kandang || [];
        const safeBebek = bebek || [];

        // Hitung Aktual Bebek
        const totalBetina = safeBebek
          .filter(b => b.jenis === "Betina" && b.status === "Sehat")
          .reduce((s, b) => s + Number(b.populasi || 0), 0);
          
        const totalJantan = safeBebek
          .filter(b => b.jenis === "Jantan" && b.status === "Sehat")
          .reduce((s, b) => s + Number(b.populasi || 0), 0);
          
        const totalBebekAktual = safeBebek
          .filter(b => b.status === "Sehat")
          .reduce((s, b) => s + Number(b.populasi || 0), 0);

        // Hitung Kapasitas Total
        const totalKapasitas = safeKandang
          .filter(k => k.status === "Aktif")
          .reduce((s, k) => s + Number(k?.kapasitas || 0), 0);
          
        const sisaKapasitas = totalKapasitas - totalBebekAktual;

        const telurHariIni = produksi
          .filter(p => p.tanggal === today)
          .reduce((s, p) => s + Number(p.telurBagus || 0), 0);

        setStats({
          totalBetina,
          totalJantan,
          totalBebekAktual,
          sisaKapasitas,
          totalTelur: telurHariIni,
        });
      } catch (error) {
        console.error("Gagal mengambil data dashboard:", error);
      }
    };
    fetchData();
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
              title="Populasi Betina"
              value={stats.totalBetina.toLocaleString()}
              color="text-pink-500"
              darkMode={darkMode}
              icon={<FaLeaf className="text-pink-500" />}
              subtitle="Ekor Petelur"
            />

            <StatCard
              title="Populasi Jantan"
              value={stats.totalJantan.toLocaleString()}
              color="text-blue-500"
              darkMode={darkMode}
              icon={<FaLeaf className="text-blue-500" />}
              subtitle="Ekor Pejantan"
            />

            <StatCard
              title="Total & Kapasitas"
              value={stats.totalBebekAktual.toLocaleString()}
              color="text-green-500"
              darkMode={darkMode}
              icon={<FaWarehouse className="text-green-500" />}
              subtitle={`Sisa Ruang: ${stats.sisaKapasitas} Ekor`}
            />

            <StatCard
              title="Produksi Hari Ini"
              value={stats.totalTelur.toLocaleString()}
              color="text-orange-500"
              darkMode={darkMode}
              icon={<FaEgg className="text-orange-500" />}
              subtitle="Butir Telur"
            />
          </div>

          {/* CHARTS GRID 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
            <ProductionChart darkMode={darkMode} rawData={produksiData} />
            <MonthlyChart darkMode={darkMode} rawData={produksiData} />
          </div>

          {/* CHARTS GRID 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="lg:col-span-2">
              <FeedConsumptionChart darkMode={darkMode} rawData={pakanData} />
            </div>
            <div>
              <KandangPerformance darkMode={darkMode} rawKandang={kandangList} rawProduksi={produksiData} />
            </div>
          </div>

        </>
      )}
    </DashboardLayout>
  );
}

export default Dashboard;
