function KandangPerformance({ darkMode, rawKandang = [], rawProduksi = [] }) {
  const currentYear  = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const getPerformaColor = (performa) => {
    if (performa >= 90) return "bg-green-500";
    if (performa >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getPerformaLabel = (performa) => {
    if (performa >= 90) return "Excellent";
    if (performa >= 70) return "Baik";
    if (performa === 0) return "Belum Ada";
    return "Perlu Perbaikan";
  };

  const kandangPerformanceData = rawKandang.map((k) => {
    const totalTelur = rawProduksi
      .filter((p) => {
        if (!p.tanggal || p.kandang !== k.nama) return false;
        const [yr, mo] = p.tanggal.split("-").map(Number);
        return yr === currentYear && mo === currentMonth;
      })
      .reduce((s, p) => s + Number(p.telurBagus || 0), 0);

    // Target = kapasitas bebek × 30 hari
    const target   = Number(k.kapasitas || 0) * 30;
    const performa = target > 0 ? Math.min(Math.round((totalTelur / target) * 100), 100) : 0;

    return { name: k.nama, performa };
  });


  return (
    <div
      className={`
        p-5 sm:p-6 rounded-2xl shadow-md transition-colors
        ${darkMode ? "bg-gray-800" : "bg-white"}
      `}
    >
      <h2
        className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        🏠 Performa Kandang
      </h2>

      <div className="space-y-4">
        {kandangPerformanceData.length === 0 ? (
          <p className={`text-sm text-center py-4 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            Belum ada data kandang.
          </p>
        ) : (
          kandangPerformanceData.map((item) => (
          <div key={item.name}>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {item.name}
                </span>

                <span
                  className={`
                    text-[10px] px-2 py-0.5 rounded-full font-medium
                    ${
                      item.performa >= 90
                        ? darkMode
                          ? "bg-green-900/30 text-green-400"
                          : "bg-green-100 text-green-700"
                        : item.performa >= 70
                          ? darkMode
                            ? "bg-yellow-900/30 text-yellow-400"
                            : "bg-yellow-100 text-yellow-700"
                          : darkMode
                            ? "bg-red-900/30 text-red-400"
                            : "bg-red-100 text-red-700"
                    }
                  `}
                >
                  {getPerformaLabel(item.performa)}
                </span>
              </div>

              <span
                className={`text-sm font-bold ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {item.performa}%
              </span>
            </div>

            {/* Progress bar */}
            <div
              className={`
                w-full h-2.5 rounded-full
                ${darkMode ? "bg-gray-700" : "bg-gray-200"}
              `}
            >
              <div
                className={`
                  h-2.5 rounded-full transition-all duration-700 ease-out
                  ${getPerformaColor(item.performa)}
                `}
                style={{ width: `${item.performa}%` }}
              />
            </div>
          </div>
        ))
        )}
      </div>
    </div>
  );
}

export default KandangPerformance;
