import DashboardLayout from "../../components/layout/DashboardLayout";
import ProductionChart from "../../components/cards/ProductionChart";
import MonthlyChart from "../../components/cards/MonthlyChart";
import { FaArrowUp, FaArrowDown, FaCheckCircle, FaInfoCircle } from "react-icons/fa";

function Produksi() {
  const kandangData = JSON.parse(localStorage.getItem("kandangData") || "[]");

  return (
    <DashboardLayout>
      {(darkMode) => (
        <>
          <div className="mb-6 sm:mb-8">
            <h1
              className={`
                text-2xl sm:text-3xl font-bold
                ${darkMode ? "text-white" : "text-gray-800"}
              `}
            >
              Produksi Telur
            </h1>
            <p className={`mt-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Analisis dan monitoring produksi telur peternakan
            </p>
          </div>

          {/* CHARTS FULL WIDTH */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <ProductionChart darkMode={darkMode} />
            <MonthlyChart darkMode={darkMode} />
          </div>

          {/* GRID BOTTOM */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* TARGET PRODUKSI */}
            <div className={`rounded-2xl shadow-md p-5 sm:p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <div className="mb-6">
                <h2 className={`text-lg sm:text-xl font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                  Target Produksi Mingguan
                </h2>
                <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Progress pencapaian target produksi minggu ini
                </p>
              </div>

              <div className="space-y-6">
                {kandangData.length === 0 ? (
                  <p className={`text-sm text-center py-4 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                    Belum ada data target kandang.
                  </p>
                ) : (
                  kandangData.map((k) => (
                    <div key={k.nama}>
                      <div className={`flex justify-between mb-2 text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        <span className="font-medium">{k.nama} (Target: {Number(k.kapasitas) * 7} Butir)</span>
                        <span className="font-bold text-gray-500">0%</span>
                      </div>
                      <div className={`w-full h-3 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                        <div className="h-3 rounded-full bg-green-500 transition-all duration-1000" style={{ width: "0%" }}></div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* RECENT ACTIVITY */}
            <div className={`rounded-2xl shadow-md p-5 sm:p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <div className="mb-6">
                <h2 className={`text-lg sm:text-xl font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                  Aktivitas Produksi Terkini
                </h2>
                <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Catatan aktivitas dan anomali produksi telur
                </p>
              </div>

              <div className="space-y-5">
                {kandangData.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <FaInfoCircle className={`text-4xl mb-3 ${darkMode ? "text-gray-600" : "text-gray-300"}`} />
                    <p className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                      Belum ada aktivitas produksi.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-center py-4">
                      <p className={`text-sm italic ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                        Pencatatan produksi harian akan muncul di sini...
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default Produksi;
