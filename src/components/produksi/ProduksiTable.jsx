import { FaEdit, FaTrash } from "react-icons/fa";

function ProduksiTable({ produksiData, onEdit, onDelete, darkMode, canEdit, canDelete }) {
  if (produksiData.length === 0) {
    return (
      <div className={`text-center py-10 rounded-2xl border ${darkMode ? "bg-gray-800 border-gray-700 text-gray-400" : "bg-white border-gray-200 text-gray-500"}`}>
        <p>Belum ada data produksi telur. Silakan tambahkan data baru.</p>
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto rounded-2xl border shadow-sm ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
      <table className="w-full text-sm text-left">
        <thead className={`text-xs uppercase ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-50 text-gray-600"}`}>
          <tr>
            <th className="px-6 py-4 font-medium">Tanggal</th>
            <th className="px-6 py-4 font-medium">Kandang</th>
            <th className="px-6 py-4 font-medium text-center">Telur Bagus</th>
            <th className="px-6 py-4 font-medium text-center">Telur Retak</th>
            <th className="px-6 py-4 font-medium text-center">Total</th>
            {(canEdit || canDelete) && <th className="px-6 py-4 font-medium text-center">Aksi</th>}
          </tr>
        </thead>
        <tbody className={`divide-y ${darkMode ? "divide-gray-700" : "divide-gray-100"}`}>
          {produksiData.map((item) => (
            <tr
              key={item.id}
              className={`transition-colors ${darkMode ? "hover:bg-gray-750 text-gray-300" : "hover:bg-gray-50 text-gray-700"}`}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(item.tanggal).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </td>
              <td className="px-6 py-4 font-medium">{item.kandang}</td>
              <td className="px-6 py-4 text-center text-green-600 font-bold">{item.telurBagus}</td>
              <td className="px-6 py-4 text-center text-red-500">{item.telurRetak}</td>
              <td className="px-6 py-4 text-center font-bold">{item.totalTelur}</td>
              {(canEdit || canDelete) && (
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    {canEdit && (
                      <button
                        onClick={() => onEdit(item)}
                        className={`p-2 rounded-lg transition-colors ${darkMode ? "hover:bg-gray-700 text-blue-400" : "hover:bg-blue-50 text-blue-600"}`}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                    )}
                    {canDelete && (
                      <button
                        onClick={() => onDelete(item.id)}
                        className={`p-2 rounded-lg transition-colors ${darkMode ? "hover:bg-gray-700 text-red-400" : "hover:bg-red-50 text-red-600"}`}
                        title="Hapus"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProduksiTable;
