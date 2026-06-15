import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaWarehouse } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { gudangService } from "../../services/gudangService";

import DashboardLayout from "../../components/layout/DashboardLayout";
import GudangTable from "../../components/gudang/GudangTable";
import GudangModal from "../../components/gudang/GudangModal";

function Gudang() {
  const { hasPermission } = useAuth();

  const canCreate = hasPermission("canCreate");
  const canDelete = hasPermission("canDelete");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [gudangData, setGudangData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;

  const fetchData = async () => {
    setIsLoading(true);

    const data = await gudangService.getAll();

    setGudangData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = (gudangData || []).filter((item) => {
    const namaPakan = item?.namaPakan || "";

    return namaPakan.toLowerCase().includes(search.toLowerCase());
  });

  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;

  const currentData = filteredData.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filteredData.length / dataPerPage) || 1;

  const handleSave = async (data) => {
    try {
      await gudangService.tambahStok(data);
      Swal.fire(
        "Berhasil!",
        `Stok ${data.namaPakan} berhasil ditambahkan`,
        "success",
      );

      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Yakin ingin menghapus?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus!",
    });

    if (result.isConfirmed) {
      await gudangService.delete(id);

      Swal.fire("Terhapus!", "Data gudang berhasil dihapus", "success");

      fetchData();
    }
  };

  const totalJenis = gudangData.length;

  const totalStok = gudangData.reduce((sum, item) => sum + (item.stok || 0), 0);

  const stokMenipis = gudangData.filter(
    (item) => item.stok <= item.minimum,
  ).length;

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
                Gudang Pakan
              </h1>

              <p
                className={`mt-1 text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Kelola stok pakan peternakan
              </p>
            </div>

            {canCreate && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="
                  bg-green-700 hover:bg-green-800
                  text-white px-5 py-2.5 rounded-xl
                  font-medium transition-colors
                  flex items-center gap-2
                "
              >
                <FaWarehouse />+ Tambah Stok
              </button>
            )}
          </div>

          {/* STATISTICS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div
              className={`rounded-2xl p-4 shadow-md ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Jenis Pakan
              </p>

              <h2
                className={`text-2xl font-bold mt-1 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {totalJenis}
              </h2>
            </div>

            <div
              className={`rounded-2xl p-4 shadow-md ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Total Stok
              </p>

              <h2 className="text-2xl font-bold mt-1 text-green-500">
                {totalStok} Kg
              </h2>
            </div>

            <div
              className={`rounded-2xl p-4 shadow-md ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Stok Menipis
              </p>

              <h2 className="text-2xl font-bold mt-1 text-red-500">
                {stokMenipis}
              </h2>
            </div>
          </div>

          {/* SEARCH */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Cari jenis pakan..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className={`
                border p-3 rounded-xl
                w-full sm:w-80
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
                ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-300"
                }
              `}
            />
          </div>

          {/* TABLE */}
          <GudangTable
            data={currentData}
            onDelete={handleDelete}
            darkMode={darkMode}
            canDelete={canDelete}
          />

          {/* PAGINATION */}
          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`
                px-4 py-2 rounded-xl
                disabled:opacity-50
                ${darkMode ? "bg-gray-700 text-white" : "bg-gray-200"}
              `}
            >
              Prev
            </button>

            <span
              className={`font-semibold ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="
                px-4 py-2 rounded-xl
                bg-green-600 hover:bg-green-700
                text-white
                disabled:opacity-50
              "
            >
              Next
            </button>
          </div>

          {/* MODAL */}
          <GudangModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
            darkMode={darkMode}
          />
        </>
      )}
    </DashboardLayout>
  );
}

export default Gudang;
