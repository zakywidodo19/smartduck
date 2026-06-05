import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

function FeedConsumptionChart({ darkMode, rawData = [] }) {
  // Bangun data 7 hari terakhir dari rawData pakan
  const chartData = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr  = d.toISOString().split("T")[0];
    const dayName  = d.toLocaleDateString("id-ID", { weekday: "short" });

    const dayEntries = rawData.filter(p => p.tanggal === dateStr);

    const konsentrat = dayEntries.filter(p => p.jenisPakan === "Konsentrat").reduce((s, p) => s + Number(p.jumlah || 0), 0);
    const dedak      = dayEntries.filter(p => p.jenisPakan === "Dedak").reduce((s, p) => s + Number(p.jumlah || 0), 0);
    const jagung     = dayEntries.filter(p => p.jenisPakan === "Jagung").reduce((s, p) => s + Number(p.jumlah || 0), 0);
    const lainnya    = dayEntries.filter(p => !["Konsentrat","Dedak","Jagung"].includes(p.jenisPakan)).reduce((s, p) => s + Number(p.jumlah || 0), 0);

    chartData.push({ hari: dayName, konsentrat, dedak, jagung, lainnya });
  }

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
        🌾 Konsumsi Pakan Mingguan
      </h2>

      <div className="w-full h-[250px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={darkMode ? "#374151" : "#f0f0f0"}
            />
            <XAxis
              dataKey="hari"
              stroke={darkMode ? "#9CA3AF" : "#6B7280"}
              fontSize={12}
            />
            <YAxis
              stroke={darkMode ? "#9CA3AF" : "#6B7280"}
              fontSize={12}
              unit=" kg"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                border: darkMode ? "1px solid #374151" : "1px solid #E5E7EB",
                borderRadius: "12px",
                color: darkMode ? "#F9FAFB" : "#111827",
              }}
            />
            <Legend
              wrapperStyle={{ color: darkMode ? "#D1D5DB" : "#374151" }}
            />
            <Bar
              dataKey="konsentrat"
              name="Konsentrat"
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
              maxBarSize={20}
            />
            <Bar
              dataKey="dedak"
              name="Dedak"
              fill="#F59E0B"
              radius={[4, 4, 0, 0]}
              maxBarSize={20}
            />
            <Bar
              dataKey="jagung"
              name="Jagung"
              fill="#EF4444"
              radius={[4, 4, 0, 0]}
              maxBarSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default FeedConsumptionChart;
