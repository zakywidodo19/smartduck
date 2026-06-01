import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { GiWheat } from "react-icons/gi";
import { useAuth } from "../../contexts/AuthContext";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PakanTable from "../../components/pakan/PakanTable";
import PakanModal from "../../components/pakan/PakanModal";

function Pakan() {
  const { hasPermission } = useAuth();
  const canEdit = hasPermission("canEdit");
  const canDelete = hasPermission("canDelete");
  const canCreate = hasPermission("canCreate");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // Data
  const [pakanData, setPakanData] = useState(() => {
    const saved = localStorage.getItem("smartduck_pakan");
    return saved ? JSON.parse(saved) : [];
  });

  // Search & Filter
  const [search, setSearch] = useState("");
  const [filterJenis, setFilterJenis] = useState("Semua");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("smartduck_pakan", JSON.stringify(pakanData));
  }, [pakanData]);

  // Filtered data
  const filteredData = pakanData.filter((item) => {
    const matchSearch =
      item.kandangTujuan.toLowerCase().includes(search.toLowerCase()) ||
      item.jenisPakan.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filterJenis === "Semua" ? true : item.jenisPakan === filterJenis;
    return matchSearch && matchFilter;
  });

  // Pagination
  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const currentData = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / dataPerPage) || 1;

  // Save
  const handleSave = (data) => {
    if (editData) {
      const updated = pakanData.map((item) =>
        item.id === editData.id ? { ...data, id: editData.id } : item
      );
      setPakanData(updated);
      setEditData(null);

      Swal.fire({
        title: "Berhasil!",
        text: "Data pakan berhasil diperbarui",
        icon: "success",
        confirmButtonColor: "#15803d",
        timer: 1500,
      });
    } else {
      const newData = { ...data, id: Date.now() };
      setPakanData([newData, ...pakanData]);

      Swal.fire({
        title: "Berhasil!",
        text: "Data pakan berhasil ditambahkan",
        icon: "success",
        confirmButtonColor: "#15803d",
        timer: 1500,
      });
    }
    setIsModalOpen(false);
  };

  // Delete
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Data pakan yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      setPakanData(pakanData.filter((item) => item.id !== id));
      Swal.fire({
        title: "Terhapus!",
        text: "Data pakan berhasil dihapus",
        icon: "success",
        confirmButtonColor: "#15803d",
        timer: 1500,
      });
    }
  };

  // Edit
  const handleEdit = (data) => {
    setEditData(data);
    setIsModalOpen(true);
  };

  // Stats
  const totalPakan = pakanData.reduce((sum, item) => sum + item.jumlah, 0);
  const jenisPakanSet = new Set(pakanData.map((item) => item.jenisPakan));

  return (
    <DashboardLayout>
      {(darkMode) => (
        <>
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1
                className={`
                  text-2xl sm:text-3xl font-bold
                  ${darkMode ? "text-white" : "text-gray-800"}
                `}
              >
                Manajemen Pakan
              </h1>
              <p className={`mt-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Kelola data pakan peternakan bebek
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
                  flex items-center gap-2
                "
              >
                <GiWheat />
                + Tambah Pakan
              </button>
            )}
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className={`rounded-2xl p-4 shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Total Data Pakan</p>
              <h2 className={`text-2xl font-bold mt-1 ${darkMode ? "text-white" : "text-gray-800"}`}>
                {pakanData.length}
              </h2>
            </div>

            <div className={`rounded-2xl p-4 shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Total Pakan (Kg)</p>
              <h2 className="text-2xl font-bold mt-1 text-orange-500">{totalPakan} Kg</h2>
            </div>

            <div className={`rounded-2xl p-4 shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Jenis Pakan</p>
              <h2 className="text-2xl font-bold mt-1 text-blue-500">{jenisPakanSet.size} Jenis</h2>
            </div>
          </div>

          {/* SEARCH & FILTER */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              placeholder="Cari pakan atau kandang..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className={`
                border p-3 rounded-xl w-full sm:w-80
                focus:outline-none focus:ring-2 focus:ring-green-500
                transition-all
                ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                    : "bg-white border-gray-300 placeholder-gray-400"
                }
              `}
            />

            <select
              value={filterJenis}
              onChange={(e) => {
                setFilterJenis(e.target.value);
                setCurrentPage(1);
              }}
              className={`
                border p-3 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-green-500
                transition-all
                ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-300"
                }
              `}
            >
              <option value="Semua">Semua Jenis</option>
              <option value="Konsentrat">Konsentrat</option>
              <option value="Dedak">Dedak</option>
              <option value="Jagung">Jagung</option>
              <option value="Campuran">Campuran</option>
              <option value="Pelet">Pelet</option>
            </select>
          </div>

          {/* TABLE */}
          <PakanTable
            pakanData={currentData}
            onEdit={handleEdit}
            onDelete={handleDelete}
            darkMode={darkMode}
            canEdit={canEdit}
            canDelete={canDelete}
          />

          {/* PAGINATION */}
          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`
                px-4 py-2 rounded-xl font-medium text-sm
                disabled:opacity-50 transition-colors
                ${darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}
              `}
            >
              Prev
            </button>

            <span className={`font-semibold text-sm ${darkMode ? "text-white" : "text-gray-700"}`}>
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="
                px-4 py-2 rounded-xl
                bg-green-600 hover:bg-green-700
                text-white font-medium text-sm
                disabled:opacity-50 transition-colors
              "
            >
              Next
            </button>
          </div>

          {/* MODAL */}
          <PakanModal
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

export default Pakan;
