function GudangTable({ data, onEdit, onDelete, darkMode, canEdit, canDelete }) {
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
            <tr
              className={`border-b ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <th
                className={`text-left p-3 sm:p-4 text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                Jenis Pakan
              </th>
              <th
                className={`text-left p-3 sm:p-4 text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                Stok
              </th>
              <th
                className={`text-left p-3 sm:p-4 text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                Minimum
              </th>
              <th
                className={`text-left p-3 sm:p-4 text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                Status
              </th>

              {(canEdit || canDelete) && (
                <th
                  className={`text-left p-3 sm:p-4 text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}
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
              data.map((item) => (
                <tr key={item.id}>
                  <td className="p-4">{item.namaPakan}</td>

                  <td className="p-4 font-semibold">{item.stok} Kg</td>

                  <td className="p-4">{item.minimum} Kg</td>

                  <td className="p-4">
                    {item.stok <= item.minimum ? (
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded">
                        Menipis
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                        Aman
                      </span>
                    )}
                  </td>

                  {(canEdit || canDelete) && (
                    <td className="p-4 flex gap-2">
                      {canEdit && (
                        <button
                          onClick={() => onEdit(item)}
                          className="bg-blue-500 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                      )}

                      {canDelete && (
                        <button
                          onClick={() => onDelete(item.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Hapus
                        </button>
                      )}
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
