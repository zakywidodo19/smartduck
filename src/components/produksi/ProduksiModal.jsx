import { useState, useEffect } from "react";
import { kandangService } from "../../services/kandangService";

function ProduksiModal({ isOpen, onClose, onSave, editData, darkMode }) {
  const [formData, setFormData] = useState({
    tanggal: new Date().toISOString().split("T")[0],
    kandang: "",
    telurBagus: "",
    telurRetak: "",
  });

  const [kandangOptions, setKandangOptions] = useState(["- Belum ada kandang -"]);

  useEffect(() => {
    const fetchKandang = async () => {
      const kandangs = await kandangService.getAll();
      if (kandangs.length > 0) {
        setKandangOptions(kandangs.map((k) => k.nama));
      }
    };
    if (isOpen) fetchKandang();
  }, [isOpen]);

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      setFormData({
        tanggal: new Date().toISOString().split("T")[0],
        kandang: kandangOptions[0],
        telurBagus: "",
        telurRetak: "0", // Default to 0 for cracked eggs
      });
    }
  }, [editData, isOpen, kandangOptions]);

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
      telurBagus: Number(formData.telurBagus),
      telurRetak: Number(formData.telurRetak),
      totalTelur: Number(formData.telurBagus) + Number(formData.telurRetak)
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
        z-50 p-4
      "
      onClick={onClose}
    >
      <div
        className={`
          w-full max-w-md
          rounded-2xl p-6
          shadow-2xl
          animate-[fadeIn_0.2s_ease-out]
          ${darkMode ? "bg-gray-800" : "bg-white"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-800"}`}>
          {editData ? "Edit Produksi Telur" : "Catat Produksi Telur"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tanggal */}
          <div>
            <label className={labelClass}>Tanggal Panen</label>
            <input
              type="date"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* Kandang */}
          <div>
            <label className={labelClass}>Kandang</label>
            <select
              name="kandang"
              value={formData.kandang}
              onChange={handleChange}
              className={inputClass}
            >
              {kandangOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Telur Bagus */}
          <div>
            <label className={labelClass}>Telur Bagus (Butir)</label>
            <input
              type="number"
              name="telurBagus"
              value={formData.telurBagus}
              onChange={handleChange}
              placeholder="Jumlah telur bagus"
              className={inputClass}
              min="0"
              required
            />
          </div>

          {/* Telur Retak/Rusak */}
          <div>
            <label className={labelClass}>Telur Retak/Rusak (Butir)</label>
            <input
              type="number"
              name="telurRetak"
              value={formData.telurRetak}
              onChange={handleChange}
              placeholder="Jumlah telur rusak"
              className={inputClass}
              min="0"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
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
                px-4 py-2.5 rounded-xl
                bg-green-700 hover:bg-green-800
                text-white font-medium
                transition-colors
              "
            >
              {editData ? "Perbarui" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProduksiModal;
