import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaEgg } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { bebekService } from "../../services/bebekService";

import DashboardLayout from "../../components/layout/DashboardLayout";
import BebekTable from "../../components/bebek/BebekTable";
import BebekModal from "../../components/bebek/BebekModal";

function Bebek() {
  const { hasPermission } = useAuth();
  
  const canCreate = hasPermission("canCreate");
  const canEdit = hasPermission("canEdit");
  const canDelete = hasPermission("canDelete");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [bebekData, setBebekData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");

  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;

  const fetchData = async () => {
    setIsLoading(true);
    const data = await bebekService.getAll();
    setBebekData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = (bebekData || []).filter((item) => {
    const itemName = item?.batch || "";
    const itemStatus = item?.status || "";
    const matchSearch = itemName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "Semua" ? true : itemStatus === filterStatus;
    return matchSearch && matchStatus;
  });

  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const currentData = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / dataPerPage) || 1;

  const handleSave = async (data) => {
    try {
      if (editData) {
        await bebekService.update(editData.id, data);
        Swal.fire("Berhasil!", "Data bebek diperbarui", "success");
      } else {
        await bebekService.create(data);
        Swal.fire("Berhasil!", "Data bebek ditambahkan", "success");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data", "error");
    }
  };

  const handleDelete = async (index) => {
    const itemToDelete = currentData[index];
    
    if (!itemToDelete || !itemToDelete.id) {
       return;
    }

    const result = await Swal.fire({
      title: "Yakin ingin menghapus?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus!",
    });

    if (result.isConfirmed) {
      try {
        await bebekService.delete(itemToDelete.id);
        Swal.fire("Terhapus!", "Data berhasil dihapus", "success");
        fetchData();
        if (currentData.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } catch (error) {
        Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data", "error");
      }
    }
  };

  const handleEdit = (data) => {
    setEditData(data);
    setIsModalOpen(true);
  };

  return (
    <DashboardLayout>
      {(darkMode) => (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1
                className={`
                  text-2xl sm:text-3xl font-bold
                  ${darkMode ? "text-white" : "text-gray-800"}
                `}
              >
                Data Bebek
              </h1>

              <p className={`mt-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Kelola master data bebek dan populasi
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
                <FaEgg />
                + Tambah Data
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              placeholder="Cari batch/kelompok..."
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
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
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
              <option value="Semua">Semua Status</option>
              <option value="Sehat">Sehat</option>
              <option value="Sakit">Sakit</option>
              <option value="Afkir">Afkir</option>
            </select>
          </div>

          {isLoading ? (
            <div className={`p-8 text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Memuat data...
            </div>
          ) : (
            <BebekTable
              bebekData={currentData}
              onEdit={handleEdit}
              onDelete={handleDelete}
              darkMode={darkMode}
              canEdit={canEdit}
              canDelete={canDelete}
            />
          )}

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

          <BebekModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
            editData={editData}
            darkMode={darkMode}
          />
        </>
      )}
    </DashboardLayout>
  );
}

export default Bebek;
