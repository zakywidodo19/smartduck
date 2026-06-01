// Chart data for SmartDuck Dashboard

// Weekly egg production
export const eggProductionData = [
  { day: "Senin", telur: 0 },
  { day: "Selasa", telur: 0 },
  { day: "Rabu", telur: 0 },
  { day: "Kamis", telur: 0 },
  { day: "Jumat", telur: 0 },
  { day: "Sabtu", telur: 0 },
  { day: "Minggu", telur: 0 },
];

// Monthly egg production
export const monthlyProductionData = [
  { bulan: "Jan", telur: 0 },
  { bulan: "Feb", telur: 0 },
  { bulan: "Mar", telur: 0 },
  { bulan: "Apr", telur: 0 },
  { bulan: "Mei", telur: 0 },
  { bulan: "Jun", telur: 0 },
];

// Feed consumption data
export const feedConsumptionData = [
  { hari: "Sen", konsentrat: 0, dedak: 0, jagung: 0 },
  { hari: "Sel", konsentrat: 0, dedak: 0, jagung: 0 },
  { hari: "Rab", konsentrat: 0, dedak: 0, jagung: 0 },
  { hari: "Kam", konsentrat: 0, dedak: 0, jagung: 0 },
  { hari: "Jum", konsentrat: 0, dedak: 0, jagung: 0 },
  { hari: "Sab", konsentrat: 0, dedak: 0, jagung: 0 },
  { hari: "Min", konsentrat: 0, dedak: 0, jagung: 0 },
];

// Kandang performance data (To be populated dynamically based on Kandang data)
export const getDynamicKandangPerformance = () => {
  const savedData = localStorage.getItem("kandangData");
  const kandangs = savedData ? JSON.parse(savedData) : [];
  
  if (kandangs.length === 0) return [];

  return kandangs.map(k => ({
    name: k.nama,
    produksi: 0,
    kapasitas: Number(k.kapasitas),
    performa: k.status === 'Aktif' ? 100 : 0
  }));
};