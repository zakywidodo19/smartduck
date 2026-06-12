import { useEffect, useState } from "react";

function GudangModal({ isOpen, onClose, onSave, editData, darkMode }) {
  const [formData, setFormData] = useState({
    namaPakan: "Konsentrat",
    stok: "",
    minimum: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

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
          ${darkMode ? "bg-gray-800" : "bg-white"}
        `}
      >
        <h2
          className={`text-xl font-bold mb-4 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {editData ? "Edit" : "Tambah"} Stok
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

          <input
            type="number"
            placeholder="Stok"
            value={formData.stok}
            onChange={(e) =>
              setFormData({
                ...formData,
                stok: e.target.value,
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

          <input
            type="number"
            placeholder="Minimum"
            value={formData.minimum}
            onChange={(e) =>
              setFormData({
                ...formData,
                minimum: e.target.value,
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
