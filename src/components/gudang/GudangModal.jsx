import { useEffect, useState } from "react";

function GudangModal({ isOpen, onClose, onSave, darkMode }) {
  const [formData, setFormData] = useState({
    namaPakan: "Konsentrat",
    stok: "",
    minimum: "",
    keterangan: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    if (Number(formData.stok) <= 0) {
      Swal.fire("Gagal", "Jumlah stok harus lebih dari 0 Kg", "error");
      return;
    }

    onSave({
      ...formData,
      stok: Number(formData.stok),
      minimum: Number(formData.minimum),
    });
  };

  return (
    <div
      className="
        fixed inset-0
        bg-black/50 backdrop-blur-sm
        flex items-center justify-center
        z-50 p-4 overflow-y-auto
      "
      onClick={onClose}
    >
      <div
        className={`
    p-6 rounded-2xl w-full max-w-md
    transition-all duration-300
    animate-in fade-in zoom-in-95
    ${darkMode ? "bg-gray-800" : "bg-white"}
  `}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          className={`text-xl font-bold mb-4 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Tambah Stok Masuk
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={formData.namaPakan}
            onChange={(e) =>
              setFormData({
                ...formData,
                namaPakan: e.target.value,
              })
            }
            className={`
  w-full border p-3 rounded
  ${
    darkMode
      ? "bg-gray-700 border-gray-600 text-white"
      : "bg-white border-gray-300 text-gray-800"
  }
`}
          >
            <option>Konsentrat</option>
            <option>Dedak</option>
            <option>Jagung</option>
            <option>Campuran</option>
            <option>Pelet</option>
          </select>

          <div>
            <label
              className={`block text-sm mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              Jumlah Stok (Kg)
            </label>
            <input
              type="number"
              min="1"
              step="1"
              placeholder="Jumlah stok masuk"
              value={formData.stok}
              onChange={(e) => {
                const value = e.target.value;

                if (Number(value) < 0) return;

                setFormData({
                  ...formData,
                  stok: value,
                });
              }}
              className={`
    w-full border p-3 rounded
    ${
      darkMode
        ? "bg-gray-700 border-gray-600 text-white"
        : "bg-white border-gray-300 text-gray-800"
    }
  `}
              required
            />
          </div>

          <div>
            <label
              className={`block text-sm mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              Minimum Stok (Kg)
            </label>
            <input
              type="number"
              min="1"
              step="1"
              placeholder="Minimum stok sebelum menipis"
              value={formData.minimum}
              onChange={(e) => {
                const value = e.target.value;

                if (Number(value) < 0) return;

                setFormData({
                  ...formData,
                  minimum: value,
                });
              }}
              className={`
    w-full border p-3 rounded
    ${
      darkMode
        ? "bg-gray-700 border-gray-600 text-white"
        : "bg-white border-gray-300 text-gray-800"
    }
  `}
              required
            />
          </div>

          <div>
            <label
              className={`block text-sm mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              Keterangan (Opsional)
            </label>
            <input
              type="text"
              placeholder="Contoh: Pembelian dari supplier A"
              value={formData.keterangan}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  keterangan: e.target.value,
                })
              }
              className={`
    w-full border p-3 rounded
    ${
      darkMode
        ? "bg-gray-700 border-gray-600 text-white"
        : "bg-white border-gray-300 text-gray-800"
    }
  `}
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className={`
    px-4 py-2 rounded-lg
    ${
      darkMode
        ? "bg-gray-700 text-white hover:bg-gray-600"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }
  `}
            >
              Batal
            </button>

            <button
              type="submit"
              className="bg-green-700 text-white px-4 py-2 rounded"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GudangModal;
