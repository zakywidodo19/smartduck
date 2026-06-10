import { useEffect, useState } from "react";

function GudangModal({
  isOpen,
  onClose,
  onSave,
  editData,
  darkMode,
}) {
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
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div
        className={`
          p-6 rounded-2xl w-full max-w-md
          ${darkMode ? "bg-gray-800" : "bg-white"}
        `}
      >
        <h2 className="text-xl font-bold mb-4">
          {editData ? "Edit" : "Tambah"} Stok
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <select
            value={formData.namaPakan}
            onChange={(e) =>
              setFormData({
                ...formData,
                namaPakan: e.target.value,
              })
            }
            className="w-full border p-3 rounded"
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
            className="w-full border p-3 rounded"
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
            className="w-full border p-3 rounded"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
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