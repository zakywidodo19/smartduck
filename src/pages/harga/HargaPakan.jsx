import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { GiWheat } from "react-icons/gi";
import { useAuth } from "../../contexts/AuthContext";
import { hargaPakanService } from "../../services/hargaPakanService";

import DashboardLayout from "../../components/layout/DashboardLayout";
import HargaPakanTable from "../../components/harga/HargaPakanTable";
import HargaPakanModal from "../../components/harga/HargaPakanModal";

function HargaPakan() {
  const { hasPermission } = useAuth();

  const canCreate = hasPermission("canCreate");
  const canEdit = hasPermission("canEdit");
  const canDelete = hasPermission("canDelete");

  // MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [hargaData, setHargaData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // SEARCH
  const [search, setSearch] = useState("");

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;

  const fetchData = async () => {
    setIsLoading(true);
    const data = await hargaPakanService.getAll();
    setHargaData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // FILTER DATA
  const filteredData = (hargaData || []).filter((item) => {
    const itemName = item?.jenisPakan || "";
    return itemName.toLowerCase().includes(search.toLowerCase());
  });

  // PAGINATION LOGIC
  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const currentData = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / dataPerPage) || 1;

  // SAVE DATA
  const handleSave = async (data) => {
    try {
      if (editData) {
        await hargaPakanService.update(editData.id, data);
        Swal.fire("Berhasil!", "Harga pakan diperbarui", "success");
      } else {
        await hargaPakanService.create(data);
        Swal.fire("Berhasil!", "Harga pakan ditambahkan", "success");
      }
      setIsModalOpen(false);
      setEditData(null);
      fetchData();
    } catch {
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data", "error");
    }
  };

  // DELETE
  const handleDelete = async (index) => {
    const itemToDelete = currentData[index];

    if (!itemToDelete || !itemToDelete.id) return;

    const result = await Swal.fire({
      title: "Yakin ingin menghapus?",
      text: `Harga pakan "${itemToDelete.jenisPakan}" akan dihapus permanen.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
      confirmButtonColor: "#ef4444",
    });

    if (result.isConfirmed) {
      await hargaPakanService.delete(itemToDelete.id);
      Swal.fire("Terhapus!", "Data harga pakan berhasil dihapus", "success");
      fetchData();
      if (currentData.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  // EDIT
  const handleEdit = (data) => {
    setEditData(data);
    setIsModalOpen(true);
  };

  return (
    <DashboardLayout>
      {(darkMode) => (
        <>
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1
                className={`
                  text-2xl sm:text-3xl font-bold
                  ${darkMode ? "text-white" : "text-gray-800"}
                `}
              >
                Harga Pakan
              </h1>

              <p className={`mt-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Kelola master data harga pakan bebek
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
                <GiWheat />
                + Tambah Harga Pakan
              </button>
            )}
          </div>

          {/* SEARCH */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              placeholder="Cari jenis pakan..."
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
          </div>

          {/* TABLE */}
          <HargaPakanTable
            data={currentData}
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
          <HargaPakanModal
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

export default HargaPakan;
