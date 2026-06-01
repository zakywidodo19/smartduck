import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { FaEgg, FaWarehouse, FaChartLine, FaCheckCircle, FaPrint, FaFilePdf } from "react-icons/fa";
import Swal from "sweetalert2";

function Laporan() {
  const [isExporting, setIsExporting] = useState(false);

  const kandangData = JSON.parse(localStorage.getItem("kandangData") || "[]");
  
  const laporanData = kandangData.map(k => ({
    kandang: k.nama,
    populasi: k.kapasitas,
    produksi: 0,
    pakan: "-",
    kesehatan: k.status === 'Aktif' ? 'Sehat' : '-',
    status: k.status
  }));

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    
    // Simulate loading for PDF generation
    await new Promise(r => setTimeout(r, 1000));
    
    Swal.fire({
      title: "Fitur Sedang Dikembangkan!",
      text: "Export PDF akan menggunakan library jsPDF. Fitur segera hadir di update berikutnya.",
      icon: "info",
      confirmButtonColor: "#15803d",
    });
    
    setIsExporting(false);
  };

  return (
    <DashboardLayout>
      {(darkMode) => (
        <div className="print-section">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
                Laporan Peternakan
              </h1>
              <p className={`mt-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Ringkasan komprehensif operasional peternakan bebek
              </p>
            </div>

            <div className="flex items-center gap-2 print:hidden">
              <button
                onClick={handlePrint}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors
                  ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"}
                `}
              >
                <FaPrint /> Print
              </button>
              
              <button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="
                  flex items-center gap-2 px-4 py-2 rounded-xl font-medium
                  bg-red-600 hover:bg-red-700 text-white transition-colors
                  disabled:opacity-70 disabled:cursor-not-allowed
                "
              >
                {isExporting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FaFilePdf />
                )}
                Export PDF
              </button>
            </div>
          </div>

          {/* PRINT HEADER ONLY */}
          <div className="hidden print:block text-center mb-8 border-b-2 border-gray-800 pb-4">
             <h1 className="text-3xl font-bold text-gray-900">Laporan Resmi SmartDuck</h1>
             <p className="text-gray-600">Dicetak pada: {new Date().toLocaleDateString('id-ID')}</p>
          </div>

          {/* STATISTIK */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* TOTAL PRODUKSI */}
            <div className={`rounded-2xl p-5 shadow-md border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100 print:border-gray-300"}`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Total Produksi Telur</p>
                  <h1 className={`text-2xl font-bold mt-1 ${darkMode ? "text-white" : "text-gray-800"}`}>0</h1>
                  <p className={`text-xs mt-1 ${darkMode ? "text-green-400" : "text-green-600"}`}>0% bulan ini</p>
                </div>
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                  <FaEgg className="text-orange-500 text-xl" />
                </div>
              </div>
            </div>

            {/* KANDANG */}
            <div className={`rounded-2xl p-5 shadow-md border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100 print:border-gray-300"}`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Populasi Keseluruhan</p>
                  <h1 className={`text-2xl font-bold mt-1 ${darkMode ? "text-white" : "text-gray-800"}`}>
                    {kandangData.reduce((sum, k) => sum + Number(k.kapasitas), 0)}
                  </h1>
                  <p className={`text-xs mt-1 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>Tersebar di {kandangData.length} Kandang</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <FaWarehouse className="text-blue-500 text-xl" />
                </div>
              </div>
            </div>

            {/* PERFORMA */}
            <div className={`rounded-2xl p-5 shadow-md border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100 print:border-gray-300"}`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Rata-rata Performa</p>
                  <h1 className={`text-2xl font-bold mt-1 ${darkMode ? "text-white" : "text-gray-800"}`}>0%</h1>
                  <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Belum Ada Data</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <FaChartLine className="text-green-500 text-xl" />
                </div>
              </div>
            </div>

            {/* STATUS */}
            <div className={`rounded-2xl p-5 shadow-md border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100 print:border-gray-300"}`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Kesehatan Ternak</p>
                  <h1 className={`text-2xl font-bold mt-1 text-green-500`}>0%</h1>
                  <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Belum Ada Data</p>
                </div>
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                  <FaCheckCircle className="text-emerald-500 text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* TABLE LAPORAN */}
          <div className={`rounded-2xl shadow-md border mb-6 sm:mb-8 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100 print:border-gray-300 print:shadow-none"}`}>
            <div className={`p-4 sm:p-6 border-b ${darkMode ? "border-gray-700" : "border-gray-100 print:border-gray-300"}`}>
              <h2 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-800 print:text-black"}`}>
                Laporan Performa Kandang Bulan Ini
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className={`text-left text-xs uppercase tracking-wider ${darkMode ? "bg-gray-750 text-gray-400" : "bg-gray-50 text-gray-500 print:bg-white print:text-gray-700"}`}>
                    <th className="p-4 border-b dark:border-gray-700">Kandang</th>
                    <th className="p-4 border-b dark:border-gray-700 text-center">Populasi (Ekor)</th>
                    <th className="p-4 border-b dark:border-gray-700 text-center">Produksi (Butir)</th>
                    <th className="p-4 border-b dark:border-gray-700">Jenis Pakan Utama</th>
                    <th className="p-4 border-b dark:border-gray-700">Kesehatan</th>
                    <th className="p-4 border-b dark:border-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {laporanData.map((item, index) => (
                    <tr key={index} className={`border-b last:border-b-0 ${darkMode ? "border-gray-700 hover:bg-gray-750" : "border-gray-100 hover:bg-gray-50 print:border-gray-200"}`}>
                      <td className={`p-4 font-medium ${darkMode ? "text-white" : "text-gray-800 print:text-black"}`}>
                        {item.kandang}
                      </td>
                      <td className={`p-4 text-center ${darkMode ? "text-gray-300" : "text-gray-600 print:text-black"}`}>
                        {item.populasi}
                      </td>
                      <td className={`p-4 text-center font-bold ${darkMode ? "text-gray-200" : "text-gray-700 print:text-black"}`}>
                        {item.produksi}
                      </td>
                      <td className={`p-4 ${darkMode ? "text-gray-300" : "text-gray-600 print:text-black"}`}>
                        {item.pakan}
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border
                          ${item.kesehatan === "Sehat" 
                            ? darkMode ? "bg-green-900/30 text-green-400 border-green-800 print:bg-transparent print:text-green-700 print:border-none" : "bg-green-100 text-green-700 border-green-200"
                            : darkMode ? "bg-yellow-900/30 text-yellow-400 border-yellow-800 print:bg-transparent print:text-yellow-700 print:border-none" : "bg-yellow-100 text-yellow-700 border-yellow-200"
                          }
                        `}>
                          {item.kesehatan}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border
                          ${item.status === "Optimal" 
                            ? darkMode ? "bg-green-900/30 text-green-400 border-green-800 print:bg-transparent print:text-green-700 print:border-none" : "bg-green-100 text-green-700 border-green-200"
                            : item.status === "Stabil"
                              ? darkMode ? "bg-blue-900/30 text-blue-400 border-blue-800 print:bg-transparent print:text-blue-700 print:border-none" : "bg-blue-100 text-blue-700 border-blue-200"
                              : darkMode ? "bg-red-900/30 text-red-400 border-red-800 print:bg-transparent print:text-red-700 print:border-none" : "bg-red-100 text-red-700 border-red-200"
                          }
                        `}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {laporanData.length === 0 && (
                <div className={`text-center p-6 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Belum ada data kandang untuk ditampilkan di laporan.
                </div>
              )}
            </div>
          </div>
          
          {/* PRINT SIGNATURE SECTION */}
          <div className="hidden print:flex justify-between items-end mt-12 pt-8">
            <div className="text-center">
              <p className="mb-16 text-gray-700">Dibuat Oleh,</p>
              <p className="font-bold border-b border-black pb-1">Petugas Lapangan</p>
            </div>
            <div className="text-center">
              <p className="mb-16 text-gray-700">Mengetahui,</p>
              <p className="font-bold border-b border-black pb-1">Pimpinan Peternakan</p>
            </div>
          </div>
          
        </div>
      )}
    </DashboardLayout>
  );
}

export default Laporan;
