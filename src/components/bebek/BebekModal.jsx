import { useState, useEffect, useRef } from "react";
import { FaImage, FaTrash } from "react-icons/fa";
import { kandangService } from "../../services/kandangService";
import Swal from "sweetalert2";

function BebekModal({ isOpen, onClose, onSave, editData, darkMode, bebekData = [] }) {
  const [formData, setFormData] = useState({
    batch: "",
    kandangId: "",
    kandangNama: "",
    jenis: "Betina",
    populasi: "",
    usia: "",
    status: "Sehat",
    foto: null,
  });

  const [kandangList, setKandangList] = useState([]);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchKandang = async () => {
      const data = await kandangService.getAll();
      // Filter hanya kandang yang aktif
      const activeKandang = data.filter(k => k.status === "Aktif");
      setKandangList(activeKandang);
    };
    if (isOpen) {
      fetchKandang();
    }
  }, [isOpen]);

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      setFormData({
        batch: "",
        kandangId: "",
        kandangNama: "",
        jenis: "Betina",
        populasi: "",
        usia: "",
        status: "Sehat",
        foto: null,
      });
    }
  }, [editData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "kandangId") {
      const selectedKandang = kandangList.find(k => k.id === value);
      setFormData({
        ...formData,
        kandangId: value,
        kandangNama: selectedKandang ? selectedKandang.nama : "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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

    if (formData.kandangId) {
      const selectedKandang = kandangList.find(k => k.id === formData.kandangId);
      
      const currentPopulasi = bebekData
        .filter(b => b.kandangId === formData.kandangId && b.id !== editData?.id)
        .reduce((sum, b) => sum + Number(b.populasi || 0), 0);
        
      const totalPopulasi = currentPopulasi + Number(formData.populasi);

      if (selectedKandang && totalPopulasi > Number(selectedKandang.kapasitas)) {
        Swal.fire({
          icon: "error",
          title: "Kapasitas Terlampaui!",
          text: `Total populasi (${totalPopulasi} ekor) melebihi kapasitas kandang (${selectedKandang.kapasitas} ekor)! Saat ini sudah ada ${currentPopulasi} ekor di kandang ini.`,
          confirmButtonColor: "#16a34a",
          background: darkMode ? "#1f2937" : "#ffffff",
          color: darkMode ? "#ffffff" : "#000000",
        });
        return;
      }
    }

    onSave(formData);
    
    setFormData({
      batch: "",
      kandangId: "",
      kandangNama: "",
      jenis: "Betina",
      populasi: "",
      usia: "",
      status: "Sehat",
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
          {editData ? "Edit Data Bebek" : "Tambah Data Bebek"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Foto (Opsional)</label>
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

          <div>
            <label className={labelClass}>Batch/Kelompok</label>
            <input
              type="text"
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              placeholder="Contoh: Batch A-01"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Lokasi Kandang</label>
            <select
              name="kandangId"
              value={formData.kandangId}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="" disabled>-- Pilih Kandang --</option>
              {kandangList.map((kandang) => (
                <option key={kandang.id} value={kandang.id}>
                  {kandang.nama} (Kapasitas: {kandang.kapasitas} Ekor)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Jenis Bebek</label>
            <select
              name="jenis"
              value={formData.jenis}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="Betina">Betina (Petelur)</option>
              <option value="Jantan">Jantan</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Populasi (Ekor)</label>
              <input
                type="number"
                name="populasi"
                value={formData.populasi}
                onChange={handleChange}
                placeholder="0"
                className={inputClass}
                min="1"
                required
              />
            </div>
            <div>
              <label className={labelClass}>Usia (Minggu)</label>
              <input
                type="number"
                name="usia"
                value={formData.usia}
                onChange={handleChange}
                placeholder="0"
                className={inputClass}
                min="0"
                required
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="Sehat">Sehat</option>
              <option value="Sakit">Sakit</option>
              <option value="Afkir">Afkir</option>
            </select>
          </div>

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

export default BebekModal;
