import { FaEdit, FaTrash } from "react-icons/fa";

function HargaPakanTable({ data, onEdit, onDelete, darkMode, canEdit, canDelete }) {

  const formatRupiah = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num || 0);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div
      className={`
        rounded-2xl shadow-md p-4 sm:p-6
        ${darkMode ? "bg-gray-800" : "bg-white"}
      `}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
              <th className={`text-left p-3 sm:p-4 text-sm font-semibold w-12 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                No
              </th>
              <th className={`text-left p-3 sm:p-4 text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Jenis Pakan
              </th>
              <th className={`text-left p-3 sm:p-4 text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Satuan
              </th>
              <th className={`text-left p-3 sm:p-4 text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Harga
              </th>
              <th className={`text-left p-3 sm:p-4 text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Berlaku Sejak
              </th>
              {(canEdit || canDelete) && (
                <th className={`text-left p-3 sm:p-4 text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Aksi
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={canEdit || canDelete ? 6 : 5}
                  className={`p-8 text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                >
                  Belum ada data harga pakan
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={item.id || index}
                  className={`
                    border-b transition-colors
                    ${
                      darkMode
                        ? "border-gray-700 hover:bg-gray-700/50"
                        : "border-gray-100 hover:bg-gray-50"
                    }
                  `}
                >
                  <td className={`p-3 sm:p-4 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {index + 1}
                  </td>

                  <td className={`p-3 sm:p-4 font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                    {item.jenisPakan}
                  </td>

                  <td className={`p-3 sm:p-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-medium border
                      ${darkMode 
                        ? "bg-blue-900/30 text-blue-400 border-blue-800" 
                        : "bg-blue-100 text-blue-700 border-blue-200"}
                    `}>
                      {item.satuan}
                    </span>
                  </td>

                  <td className={`p-3 sm:p-4 font-semibold ${darkMode ? "text-green-400" : "text-green-700"}`}>
                    {formatRupiah(item.harga)}
                  </td>

                  <td className={`p-3 sm:p-4 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {formatDate(item.berlakuSejak)}
                  </td>

                  {(canEdit || canDelete) && (
                    <td className="p-3 sm:p-4">
                      <div className="flex gap-2">
                        {canEdit && (
                          <button
                            onClick={() => onEdit(item)}
                            className="
                              bg-blue-500 hover:bg-blue-600
                              text-white px-3 py-1.5 rounded-lg
                              text-xs font-medium transition-colors
                              flex items-center gap-1
                            "
                          >
                            <FaEdit size={11} />
                            Edit
                          </button>
                        )}
                        {canDelete && (
                          <button
                            onClick={() => onDelete(index)}
                            className="
                              bg-red-500 hover:bg-red-600
                              text-white px-3 py-1.5 rounded-lg
                              text-xs font-medium transition-colors
                              flex items-center gap-1
                            "
                          >
                            <FaTrash size={11} />
                            Hapus
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HargaPakanTable;
