import { FaImage } from "react-icons/fa";

function BebekTable({ bebekData, onEdit, onDelete, darkMode, canEdit, canDelete }) {
  return (
    <div
      className={`
        rounded-2xl shadow-md p-4 sm:p-6
        ${darkMode ? "bg-gray-800" : "bg-white"}
      `}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
              <th className={`text-left p-3 sm:p-4 text-sm font-semibold w-24 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Foto
              </th>
              <th className={`text-left p-3 sm:p-4 text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Batch/Kelompok
              </th>
              <th className={`text-left p-3 sm:p-4 text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Kandang
              </th>
              <th className={`text-left p-3 sm:p-4 text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Jenis
              </th>
              <th className={`text-left p-3 sm:p-4 text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Populasi
              </th>
              <th className={`text-left p-3 sm:p-4 text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Usia
              </th>
              <th className={`text-left p-3 sm:p-4 text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Status
              </th>
              {(canEdit || canDelete) && (
                <th className={`text-left p-3 sm:p-4 text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Aksi
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {bebekData.length === 0 ? (
              <tr>
                <td
                  colSpan={canEdit || canDelete ? 8 : 7}
                  className={`p-8 text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                >
                  Belum ada data bebek
                </td>
              </tr>
            ) : (
              bebekData.map((item, index) => (
                <tr 
                  key={index} 
                  className={`
                    border-b transition-colors
                    ${
                      darkMode
                        ? "border-gray-700 hover:bg-gray-700/50"
                        : "border-gray-100 hover:bg-gray-50"
                    }
                  `}
                >
                  <td className="p-3 sm:p-4">
                    <div className={`w-16 h-12 rounded-lg overflow-hidden border ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'} flex items-center justify-center`}>
                      {item.foto ? (
                        <img src={item.foto} alt={item.batch} className="w-full h-full object-cover" />
                      ) : (
                        <FaImage className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
                      )}
                    </div>
                  </td>

                  <td className={`p-3 sm:p-4 font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {item.batch}
                  </td>

                  <td className={`p-3 sm:p-4 font-medium text-green-600 dark:text-green-400`}>
                    {item.kandangNama || "-"}
                  </td>

                  <td className={`p-3 sm:p-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {item.jenis}
                  </td>

                  <td className={`p-3 sm:p-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {item.populasi} <span className="text-xs">Ekor</span>
                  </td>

                  <td className={`p-3 sm:p-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {item.usia} <span className="text-xs">Minggu</span>
                  </td>

                  <td className="p-3 sm:p-4">
                    <span
                      className={`
                        px-3 py-1 rounded-full text-xs font-medium border
                        ${
                          item.status === "Sehat"
                            ? darkMode ? "bg-green-900/30 text-green-400 border-green-800" : "bg-green-100 text-green-700 border-green-200"
                            : item.status === "Sakit"
                              ? darkMode ? "bg-yellow-900/30 text-yellow-400 border-yellow-800" : "bg-yellow-100 text-yellow-700 border-yellow-200"
                              : darkMode ? "bg-red-900/30 text-red-400 border-red-800" : "bg-red-100 text-red-700 border-red-200"
                        }
                      `}
                    >
                      {item.status}
                    </span>
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
                            "
                          >
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
                            "
                          >
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

export default BebekTable;
