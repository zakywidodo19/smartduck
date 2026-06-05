import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/cards/StatCard";
import { pakanService } from "../../services/pakanService";
import { produksiService } from "../../services/produksiService";
import { FaMoneyBillWave, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { GiWheat } from "react-icons/gi";

// Harga asumsi — bisa disesuaikan
const HARGA_TELUR_PER_BUTIR = 2000;   // Rp 2.000 per butir
const BIAYA_PAKAN_PER_KG    = 5000;   // Rp 5.000 per kg

const IDR = (n) =>
  "Rp " + Number(n).toLocaleString("id-ID");

function Keuangan() {
  const [rows, setRows]       = useState([]);
  const [summary, setSummary] = useState({ pemasukan: 0, pengeluaran: 0 });
  const [bulan, setBulan]     = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  useEffect(() => {
    const fetchData = async () => {
      const [produksi, pakan] = await Promise.all([
        produksiService.getAll(),
        pakanService.getAll(),
      ]);

      const [filterYr, filterMo] = bulan.split("-").map(Number);

      // Pemasukan dari telur — group by tanggal
      const pemasukanMap = {};
      produksi.forEach((p) => {
        if (!p.tanggal) return;
        const [yr, mo] = p.tanggal.split("-").map(Number);
        if (yr !== filterYr || mo !== filterMo) return;
        if (!pemasukanMap[p.tanggal]) pemasukanMap[p.tanggal] = 0;
        pemasukanMap[p.tanggal] += Number(p.telurBagus || 0) * HARGA_TELUR_PER_BUTIR;
      });

      // Pengeluaran dari pakan — group by tanggal
      const pengeluaranMap = {};
      pakan.forEach((p) => {
        if (!p.tanggal) return;
        const [yr, mo] = p.tanggal.split("-").map(Number);
        if (yr !== filterYr || mo !== filterMo) return;
        if (!pengeluaranMap[p.tanggal]) pengeluaranMap[p.tanggal] = 0;
        pengeluaranMap[p.tanggal] += Number(p.jumlah || 0) * BIAYA_PAKAN_PER_KG;
      });

      // Gabungkan semua tanggal unik
      const allDates = [
        ...new Set([...Object.keys(pemasukanMap), ...Object.keys(pengeluaranMap)]),
      ].sort((a, b) => (a < b ? 1 : -1)); // terbaru di atas

      const combined = allDates.map((tgl) => ({
        tanggal: tgl,
        pemasukan: pemasukanMap[tgl] || 0,
        pengeluaran: pengeluaranMap[tgl] || 0,
        selisih: (pemasukanMap[tgl] || 0) - (pengeluaranMap[tgl] || 0),
      }));

      setRows(combined);
      setSummary({
        pemasukan:   combined.reduce((s, r) => s + r.pemasukan, 0),
        pengeluaran: combined.reduce((s, r) => s + r.pengeluaran, 0),
      });
    };

    fetchData();
  }, [bulan]);

  const laba = summary.pemasukan - summary.pengeluaran;

  return (
    <DashboardLayout>
      {(darkMode) => (
        <>
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
            <div>
              <h1
                className={`text-2xl sm:text-3xl font-bold ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Laporan Keuangan
              </h1>
              <p
                className={`mt-1 text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Pemasukan dari telur &amp; pengeluaran pakan per hari
              </p>
            </div>

            {/* Filter Bulan */}
            <div className="flex items-center gap-2">
              <label
                className={`text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Pilih Bulan:
              </label>
              <input
                type="month"
                value={bulan}
                onChange={(e) => setBulan(e.target.value)}
                className={`border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-800"
                }`}
              />
            </div>
          </div>

          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 sm:mb-8">
            <StatCard
              title="Total Pemasukan"
              value={IDR(summary.pemasukan)}
              color="text-emerald-500"
              darkMode={darkMode}
              icon={<FaArrowUp className="text-emerald-500" />}
              subtitle={`@Rp${HARGA_TELUR_PER_BUTIR.toLocaleString("id-ID")} / butir`}
            />
            <StatCard
              title="Total Pengeluaran (Pakan)"
              value={IDR(summary.pengeluaran)}
              color="text-red-500"
              darkMode={darkMode}
              icon={<FaArrowDown className="text-red-500" />}
              subtitle={`@Rp${BIAYA_PAKAN_PER_KG.toLocaleString("id-ID")} / kg`}
            />
            <StatCard
              title="Laba / Rugi"
              value={IDR(Math.abs(laba))}
              color={laba >= 0 ? "text-blue-500" : "text-orange-500"}
              darkMode={darkMode}
              icon={<FaMoneyBillWave className={laba >= 0 ? "text-blue-500" : "text-orange-500"} />}
              subtitle={laba >= 0 ? "✅ Untung bulan ini" : "⚠️ Rugi bulan ini"}
            />
          </div>

          {/* TABEL HARIAN */}
          <div
            className={`rounded-2xl shadow-md border ${
              darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
            }`}
          >
            <div
              className={`p-4 sm:p-6 border-b ${
                darkMode ? "border-gray-700" : "border-gray-100"
              }`}
            >
              <h2
                className={`text-lg font-semibold ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Rincian Harian
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead
                  className={`text-xs uppercase tracking-wide ${
                    darkMode
                      ? "bg-gray-700 text-gray-300"
                      : "bg-gray-50 text-gray-500"
                  }`}
                >
                  <tr>
                    <th className="p-4 text-left">Tanggal</th>
                    <th className="p-4 text-right text-emerald-600">Pemasukan (Telur)</th>
                    <th className="p-4 text-right text-red-500">Pengeluaran (Pakan)</th>
                    <th className="p-4 text-right">Selisih</th>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y ${
                    darkMode ? "divide-gray-700" : "divide-gray-100"
                  }`}
                >
                  {rows.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className={`p-8 text-center ${
                          darkMode ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        Tidak ada transaksi pada bulan yang dipilih.
                      </td>
                    </tr>
                  ) : (
                    rows.map((row) => (
                      <tr
                        key={row.tanggal}
                        className={`transition-colors ${
                          darkMode
                            ? "hover:bg-gray-750 text-gray-200"
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <td className="p-4 font-medium">
                          {new Date(row.tanggal + "T00:00:00").toLocaleDateString(
                            "id-ID",
                            { weekday: "short", day: "numeric", month: "long", year: "numeric" }
                          )}
                        </td>
                        <td className="p-4 text-right font-semibold text-emerald-600">
                          {row.pemasukan > 0 ? IDR(row.pemasukan) : "-"}
                        </td>
                        <td className="p-4 text-right font-semibold text-red-500">
                          {row.pengeluaran > 0 ? IDR(row.pengeluaran) : "-"}
                        </td>
                        <td
                          className={`p-4 text-right font-bold ${
                            row.selisih >= 0 ? "text-blue-500" : "text-orange-500"
                          }`}
                        >
                          {row.selisih >= 0 ? "+" : "-"} {IDR(Math.abs(row.selisih))}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>

                {/* TOTAL ROW */}
                {rows.length > 0 && (
                  <tfoot>
                    <tr
                      className={`font-bold text-sm border-t-2 ${
                        darkMode
                          ? "border-gray-600 bg-gray-700 text-white"
                          : "border-gray-300 bg-gray-100 text-gray-800"
                      }`}
                    >
                      <td className="p-4">TOTAL BULAN INI</td>
                      <td className="p-4 text-right text-emerald-600">
                        {IDR(summary.pemasukan)}
                      </td>
                      <td className="p-4 text-right text-red-500">
                        {IDR(summary.pengeluaran)}
                      </td>
                      <td
                        className={`p-4 text-right ${
                          laba >= 0 ? "text-blue-500" : "text-orange-500"
                        }`}
                      >
                        {laba >= 0 ? "+" : "-"} {IDR(Math.abs(laba))}
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default Keuangan;
