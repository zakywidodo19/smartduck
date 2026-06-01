function MonitoringTable({ darkMode }) {
  // Ambil data kandang dari localStorage
  const kandangData = JSON.parse(localStorage.getItem("kandangData") || "[]");

  return (
    <div
      className={`
        rounded-2xl shadow-md p-4 sm:p-6
        ${darkMode ? "bg-gray-800" : "bg-white"}
      `}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2
          className={`text-lg sm:text-xl font-semibold ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Status Kandang Terkini
        </h2>

        <button
          className="
            bg-green-700 text-white
            px-4 py-2 rounded-lg text-sm font-medium
            hover:bg-green-800 transition-colors
          "
        >
          Lihat Semua
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr
              className={`border-b text-left text-sm ${
                darkMode ? "border-gray-700 text-gray-400" : "border-gray-200 text-gray-500"
              }`}
            >
              <th className="p-3 sm:p-4 font-semibold uppercase tracking-wider">Kandang</th>
              <th className="p-3 sm:p-4 font-semibold uppercase tracking-wider">Populasi</th>
              <th className="p-3 sm:p-4 font-semibold uppercase tracking-wider">Status</th>
              <th className="p-3 sm:p-4 font-semibold uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {kandangData.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className={`p-6 text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                >
                  Belum ada data kandang. Silakan tambah kandang terlebih dahulu.
                </td>
              </tr>
            ) : (
              kandangData.map((item, index) => (
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
                  <td
                    className={`p-3 sm:p-4 font-medium ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-500'}`}>
                        🦆
                      </div>
                      {item.nama}
                    </div>
                  </td>

                  <td
                    className={`p-3 sm:p-4 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {item.kapasitas} Ekor
                  </td>

                  <td className="p-3 sm:p-4">
                    <span
                      className={`
                        px-2.5 py-1 rounded-full text-xs font-medium border
                        ${
                          item.status === "Aktif"
                            ? darkMode
                              ? "bg-green-900/30 text-green-400 border-green-800"
                              : "bg-green-100 text-green-700 border-green-200"
                            : item.status === "Perbaikan"
                              ? darkMode
                                ? "bg-yellow-900/30 text-yellow-400 border-yellow-800"
                                : "bg-yellow-100 text-yellow-700 border-yellow-200"
                              : darkMode
                                ? "bg-red-900/30 text-red-400 border-red-800"
                                : "bg-red-100 text-red-700 border-red-200"
                        }
                      `}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="p-3 sm:p-4">
                    <button
                      className="
                        text-blue-500 hover:text-blue-600 hover:underline
                        text-sm font-medium transition-colors
                      "
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MonitoringTable;
