import { useState, useEffect } from "react";

function HargaTelurModal({ isOpen, onClose, onSave, editData, darkMode }) {
  const [formData, setFormData] = useState({
    jenisTelur: "",
    satuan: "Butir",
    harga: "",
    berlakuSejak: "",
    keterangan: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      setFormData({
        jenisTelur: "",
        satuan: "Butir",
        harga: "",
        berlakuSejak: new Date().toISOString().split("T")[0],
        keterangan: "",
      });
    }
  }, [editData, isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      harga: Number(formData.harga),
    });

    setFormData({
      jenisTelur: "",
      satuan: "Butir",
      harga: "",
      berlakuSejak: "",
      keterangan: "",
    });

    onClose();
  };

  if (!isOpen) return null;

  const inputClass = `
    w-full border p-3 rounded-xl transition-all
    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
    ${
      darkMode
        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
        : "bg-white border-gray-300 text-gray-800"
    }
  `;

  const labelClass = `block mb-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`;

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
          w-full max-w-md my-8
          rounded-2xl p-6
          shadow-2xl
          animate-[fadeIn_0.2s_ease-out]
          ${darkMode ? "bg-gray-800" : "bg-white"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-800"}`}>
          {editData ? "Edit Harga Telur" : "Tambah Harga Telur"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Jenis Telur */}
          <div>
            <label className={labelClass}>Jenis Telur</label>
            <input
              type="text"
              name="jenisTelur"
              value={formData.jenisTelur}
              onChange={handleChange}
              placeholder="Contoh: Telur Bagus, Telur Retak"
              className={inputClass}
              required
            />
          </div>

          {/* Satuan */}
          <div>
            <label className={labelClass}>Satuan</label>
            <select
              name="satuan"
              value={formData.satuan}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="Butir">Butir</option>
              <option value="Kg">Kg</option>
              <option value="Tray (30 Butir)">Tray (30 Butir)</option>
              <option value="Krat">Krat</option>
            </select>
          </div>

          {/* Harga */}
          <div>
            <label className={labelClass}>Harga (Rp)</label>
            <input
              type="number"
              name="harga"
              value={formData.harga}
              onChange={handleChange}
              placeholder="Contoh: 2500"
              className={inputClass}
              min="0"
              required
            />
          </div>

          {/* Berlaku Sejak */}
          <div>
            <label className={labelClass}>Berlaku Sejak</label>
            <input
              type="date"
              name="berlakuSejak"
              value={formData.berlakuSejak}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* Keterangan */}
          <div>
            <label className={labelClass}>Keterangan (Opsional)</label>
            <textarea
              name="keterangan"
              value={formData.keterangan}
              onChange={handleChange}
              placeholder="Catatan tambahan..."
              rows={2}
              className={inputClass}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className={`
                px-4 py-2.5 rounded-xl font-medium transition-colors
                ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-300" : "bg-gray-200 hover:bg-gray-300 text-gray-700"}
              `}
            >
              Batal
            </button>

            <button
              type="submit"
              className="
                px-5 py-2.5 rounded-xl
                bg-green-700 hover:bg-green-800
                text-white font-medium
                transition-colors
              "
            >
              Simpan Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HargaTelurModal;
