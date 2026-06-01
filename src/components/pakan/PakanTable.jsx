function PakanTable({ pakanData, onEdit, onDelete, darkMode, canEdit, canDelete }) {
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
              <th className={`text-left p-3 sm:p-4 text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Tanggal
              </th>
              <th className={`text-left p-3 sm:p-4 text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Jenis Pakan
              </th>
              <th className={`text-left p-3 sm:p-4 text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Jumlah (Kg)
              </th>
              <th className={`text-left p-3 sm:p-4 text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Kandang Tujuan
              </th>
              {(canEdit || canDelete) && (
                <th className={`text-left p-3 sm:p-4 text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Aksi
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {pakanData.length === 0 ? (
              <tr>
                <td
                  colSpan={canEdit || canDelete ? 5 : 4}
                  className={`p-8 text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                >
                  <span className="text-4xl block mb-2">🌾</span>
                  Belum ada data pakan
                </td>
              </tr>
            ) : (
              pakanData.map((item, index) => (
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
                  <td className={`p-3 sm:p-4 text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {item.tanggal}
                  </td>

                  <td className={`p-3 sm:p-4 text-sm font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>
                    <span className={`
                      px-2 py-1 rounded-lg text-xs
                      ${
                        item.jenisPakan === "Konsentrat"
                          ? darkMode ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-700"
                          : item.jenisPakan === "Dedak"
                            ? darkMode ? "bg-yellow-900/30 text-yellow-400" : "bg-yellow-100 text-yellow-700"
                            : item.jenisPakan === "Jagung"
                              ? darkMode ? "bg-orange-900/30 text-orange-400" : "bg-orange-100 text-orange-700"
                              : darkMode ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-700"
                      }
                    `}>
                      {item.jenisPakan}
                    </span>
                  </td>

                  <td className={`p-3 sm:p-4 text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {item.jumlah} Kg
                  </td>

                  <td className={`p-3 sm:p-4 text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {item.kandangTujuan}
                  </td>

                  {(canEdit || canDelete) && (
                    <td className="p-3 sm:p-4">
                      <div className="flex gap-2">
                        {canEdit && (
                          <button
                            onClick={() => onEdit(item)}
                            className="
                              bg-blue-500 hover:bg-blue-600
                              text-white px-3 py-1.5
                              rounded-lg text-xs font-medium
                              transition-colors
                            "
                          >
                            Edit
                          </button>
                        )}

                        {canDelete && (
                          <button
                            onClick={() => onDelete(item.id || index)}
                            className="
                              bg-red-500 hover:bg-red-600
                              text-white px-3 py-1.5
                              rounded-lg text-xs font-medium
                              transition-colors
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

export default PakanTable;
