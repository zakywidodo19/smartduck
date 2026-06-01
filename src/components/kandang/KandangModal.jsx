import { useState, useEffect, useRef } from "react";
import { FaImage, FaTrash } from "react-icons/fa";

function KandangModal({ isOpen, onClose, onSave, editData, darkMode }) {
  const [formData, setFormData] = useState({
    nama: "",
    kapasitas: "",
    status: "Aktif",
    foto: null, // Base64 string for preview/saving
  });

  const fileInputRef = useRef(null);

  // Initialize data when modal opens or editData changes
  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      setFormData({
        nama: "",
        kapasitas: "",
        status: "Aktif",
        foto: null,
      });
    }
  }, [editData, isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validasi ukuran (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("Ukuran file maksimal 2MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          foto: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setFormData({
      ...formData,
      foto: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    
    // Reset form after saving
    setFormData({
      nama: "",
      kapasitas: "",
      status: "Aktif",
      foto: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    
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
          {editData ? "Edit Kandang" : "Tambah Kandang"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Foto Kandang Upload */}
          <div>
            <label className={labelClass}>Foto Kandang (Opsional)</label>
            <div 
              className={`
                border-2 border-dashed rounded-xl p-4 text-center relative
                transition-all duration-200
                ${formData.foto ? 'border-green-500' : darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-green-400'}
                ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}
              `}
            >
              {formData.foto ? (
                <div className="relative w-full h-40 group">
                  <img 
                    src={formData.foto} 
                    alt="Preview" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="p-2 bg-white rounded-full text-gray-800 hover:bg-gray-100 transition-colors"
                      title="Ganti Foto"
                    >
                      <FaImage />
                    </button>
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                      title="Hapus Foto"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  className="py-6 cursor-pointer flex flex-col items-center justify-center"
                  onClick={() => fileInputRef.current.click()}
                >
                  <FaImage className={`text-4xl mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Klik untuk unggah foto
                  </p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    PNG, JPG max 2MB
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
              />
            </div>
          </div>

          {/* Nama */}
          <div>
            <label className={labelClass}>Nama Kandang</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Contoh: Kandang A"
              className={inputClass}
              required
            />
          </div>

          {/* Kapasitas */}
          <div>
            <label className={labelClass}>Kapasitas (Ekor)</label>
            <input
              type="number"
              name="kapasitas"
              value={formData.kapasitas}
              onChange={handleChange}
              placeholder="Contoh: 150"
              className={inputClass}
              min="1"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className={labelClass}>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="Aktif">Aktif</option>
              <option value="Tidak Aktif">Tidak Aktif</option>
              <option value="Perbaikan">Perbaikan</option>
            </select>
          </div>

          {/* Button */}
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

export default KandangModal;