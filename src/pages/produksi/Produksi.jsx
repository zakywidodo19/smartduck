import DashboardLayout from "../../components/layout/DashboardLayout";
import ProductionChart from "../../components/cards/ProductionChart";
import ProduksiTable from "../../components/produksi/ProduksiTable";
import ProduksiModal from "../../components/produksi/ProduksiModal";
import { FaEgg, FaPlus } from "react-icons/fa";
import { produksiService } from "../../services/produksiService";
import { kandangService } from "../../services/kandangService";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";

function Produksi() {
  const { hasPermission } = useAuth();
  const canEdit = hasPermission("canEdit");
  const canDelete = hasPermission("canDelete");
  const canCreate = hasPermission("canCreate");

  const [produksiData, setProduksiData] = useState([]);


  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // Search & Filter & Pagination
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;

  const fetchData = async () => {

    const [pData, kData] = await Promise.all([
      produksiService.getAll(),
      kandangService.getAll()
    ]);
    // Sort by date descending
    pData.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
    setProduksiData(pData);

  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter Data
  const filteredData = (produksiData || []).filter((item) => {
    const kNama = item?.kandang || "";
    return kNama.toLowerCase().includes(search.toLowerCase());
  });

  // Pagination
  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const currentData = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / dataPerPage) || 1;

  // Handlers
  const handleSave = async (data) => {
    if (editData) {
      await produksiService.update(editData.id, data);
      Swal.fire("Berhasil!", "Data produksi berhasil diperbarui", "success");
    } else {
      await produksiService.create(data);
      Swal.fire("Berhasil!", "Data produksi berhasil ditambahkan", "success");
    }
    setIsModalOpen(false);
    fetchData();
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Yakin ingin menghapus?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus!",
    });

    if (result.isConfirmed) {
      await produksiService.delete(id);
      Swal.fire("Terhapus!", "Data produksi berhasil dihapus", "success");
      fetchData();
      if (currentData.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handleEdit = (data) => {
    setEditData(data);
    setIsModalOpen(true);
  };

  // Stats
  const totalHariIni = produksiData
    .filter(item => item.tanggal === new Date().toISOString().split("T")[0])
    .reduce((sum, item) => sum + Number(item.telurBagus || 0) + Number(item.telurRetak || 0), 0);
    
  const totalBulanIni = produksiData
    .filter(item => {
      const date = new Date(item.tanggal);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    })
    .reduce((sum, item) => sum + Number(item.telurBagus || 0) + Number(item.telurRetak || 0), 0);

  return (
    <DashboardLayout>
      {(darkMode) => (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
                Produksi Telur
              </h1>
              <p className={`mt-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Catat dan pantau hasil panen telur harian
              </p>
            </div>
            
            {canCreate && (
              <button
                onClick={() => {
                  setEditData(null);
                  setIsModalOpen(true);
                }}
                className="
                  bg-green-700 hover:bg-green-800
                  text-white px-5 py-2.5 rounded-xl
                  font-medium transition-colors
                  flex items-center gap-2 shadow-lg shadow-green-700/30
                "
              >
                <FaPlus />
                Tambah Panen
              </button>
            )}
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className={`rounded-2xl p-5 shadow-md border flex items-center justify-between ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
              <div>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Panen Hari Ini</p>
                <h2 className={`text-3xl font-bold mt-1 text-orange-500`}>{totalHariIni} Butir</h2>
              </div>
              <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                <FaEgg className="text-orange-500 text-2xl" />
              </div>
            </div>

            <div className={`rounded-2xl p-5 shadow-md border flex items-center justify-between ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
              <div>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Total Bulan Ini</p>
                <h2 className={`text-3xl font-bold mt-1 text-green-500`}>{totalBulanIni} Butir</h2>
              </div>
              <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <FaEgg className="text-green-500 text-2xl" />
              </div>
            </div>
          </div>

          {/* CHART */}
          <div className="mb-6 sm:mb-8">
            <ProductionChart darkMode={darkMode} rawData={produksiData} />
          </div>

          {/* SEARCH & TABLE SECTION */}
          <div className={`rounded-2xl shadow-md border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
            <div className={`p-4 sm:p-6 border-b flex flex-col sm:flex-row justify-between items-center gap-4 ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
              <h2 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                Riwayat Panen
              </h2>
              <input
                type="text"
                placeholder="Cari kandang..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className={`
                  border p-2 rounded-lg w-full sm:w-64 text-sm
                  focus:outline-none focus:ring-2 focus:ring-green-500
                  ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}
                `}
              />
            </div>
            
            <div className="p-4 sm:p-6">
              <ProduksiTable
                produksiData={currentData}
                onEdit={handleEdit}
                onDelete={handleDelete}
                darkMode={darkMode}
                canEdit={canEdit}
                canDelete={canDelete}
              />
              
              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-6">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`
                      px-4 py-2 rounded-xl font-medium text-sm transition-colors
                      ${darkMode ? "bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50" : "bg-gray-100 hover:bg-gray-200 disabled:opacity-50"}
                    `}
                  >
                    Prev
                  </button>
                  <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="
                      px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700
                      text-white font-medium text-sm transition-colors disabled:opacity-50
                    "
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>

          <ProduksiModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setEditData(null);
            }}
            onSave={handleSave}
            editData={editData}
            darkMode={darkMode}
          />
        </>
      )}
    </DashboardLayout>
  );
}

export default Produksi;
