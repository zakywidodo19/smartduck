import { useState, useEffect } from "react";

function PakanModal({ isOpen, onClose, onSave, editData, darkMode }) {
  const [formData, setFormData] = useState({
    tanggal: new Date().toISOString().split("T")[0],
    jenisPakan: "Konsentrat",
    jumlah: "",
    kandangTujuan: "Kandang A",
  });

  const getKandangOptions = () => {
    const saved = localStorage.getItem("kandangData");
    const kandangs = saved ? JSON.parse(saved) : [];
    return kandangs.length > 0 ? kandangs.map((k) => k.nama) : ["- Belum ada kandang -"];
  };

  const kandangOptions = getKandangOptions();

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      setFormData({
        tanggal: new Date().toISOString().split("T")[0],
        jenisPakan: "Konsentrat",
        jumlah: "",
        kandangTujuan: getKandangOptions()[0],
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
      jumlah: Number(formData.jumlah),
    });
    onClose();
  };

  if (!isOpen) return null;

  const jenisPakanOptions = ["Konsentrat", "Dedak", "Jagung", "Campuran", "Pelet"];

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
          {editData ? "Edit Data Pakan" : "Tambah Data Pakan"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tanggal */}
          <div>
            <label className={labelClass}>Tanggal</label>
            <input
              type="date"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* Jenis Pakan */}
          <div>
            <label className={labelClass}>Jenis Pakan</label>
            <select
              name="jenisPakan"
              value={formData.jenisPakan}
              onChange={handleChange}
              className={inputClass}
            >
              {jenisPakanOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Jumlah */}
          <div>
            <label className={labelClass}>Jumlah (Kg)</label>
            <input
              type="number"
              name="jumlah"
              value={formData.jumlah}
              onChange={handleChange}
              placeholder="Masukkan jumlah dalam Kg"
              className={inputClass}
              min="0"
              step="0.5"
              required
            />
          </div>

          {/* Kandang Tujuan */}
          <div>
            <label className={labelClass}>Kandang Tujuan</label>
            <select
              name="kandangTujuan"
              value={formData.kandangTujuan}
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

export default PakanModal;
