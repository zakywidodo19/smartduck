function GudangTable({ data, onDelete, darkMode, canDelete }) {
  return (
    <div
      className={`
        rounded-2xl shadow-md p-4 sm:p-6
        ${darkMode ? "bg-gray-800" : "bg-white"}
      `}
    >
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr
              className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}
            >
              <th
                className={`
    p-4 w-16 text-left text-sm font-semibold 
    ${darkMode ? "text-white" : "text-gray-600"}
  `}
              >
                No
              </th>
              <th
                className={`
    px-3 py-2 w-28 text-left text-sm font-semibold
    ${darkMode ? "text-white" : "text-gray-600"}
  `}
              >
                Jenis Pakan
              </th>
              <th
                className={`
    px-3 py-2 w-28 text-left text-sm font-semibold
    ${darkMode ? "text-white" : "text-gray-600"}
  `}
              >
                Stok
              </th>
              <th
                className={`
    px-3 py-2 w-28 text-left text-sm font-semibold
    ${darkMode ? "text-white" : "text-gray-600"}
  `}
              >
                Minimum
              </th>
              <th
                className={`
    px-3 py-2 w-28 text-left text-sm font-semibold
    ${darkMode ? "text-white" : "text-gray-600"}
  `}
              >
                Status
              </th>

              {canDelete && (
                <th
                  className={`text-center w-28 p-3 sm:p-4 text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  Aksi
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className={`text-center p-3 sm:p-4 text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  📦 Belum ada data gudang
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={item.id}>
                  <td
                    className={`text-left p-3 sm:p-4 font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </td>
                  <td
                    className={` text-left
    p-4
    ${darkMode ? "text-gray-300" : "text-gray-600"}
  `}
                  >
                    {item.namaPakan}
                  </td>
                  <td
                    className={` text-left
    p-4
    ${darkMode ? "text-gray-300" : "text-gray-600"}
  `}
                  >
                    {item.stok} Kg
                  </td>

                  <td
                    className={`text-left
    p-4
    ${darkMode ? "text-gray-300" : "text-gray-600"}
  `}
                  >
                    {item.minimum} Kg
                  </td>

                  <td className="p-3 sm:p-4">
                    <span
                      className={`text-center
      px-3 py-1 rounded-full text-xs font-medium border
      ${
        item.stok <= item.minimum
          ? darkMode
            ? "bg-red-900/30 text-red-400 border-red-800"
            : "bg-red-100 text-red-700 border-red-200"
          : darkMode
            ? "bg-green-900/30 text-green-400 border-green-800"
            : "bg-green-100 text-green-700 border-green-200"
      }
    `}
                    >
                      {item.stok <= item.minimum ? "Menipis" : "Aman"}
                    </span>
                  </td>

                  {canDelete && (
                    <td className="p-3 sm:p-4 text-center">
                      <div className="flex justify-center">
                        <button
                          onClick={() => onDelete(item.id)}
                          className="
        bg-red-500 hover:bg-red-600
        text-white
        px-3 py-1.5
        rounded-lg
        text-sm
        transition-colors
      "
                        >
                          Hapus
                        </button>
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

export default GudangTable;
