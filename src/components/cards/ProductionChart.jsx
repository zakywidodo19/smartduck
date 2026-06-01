import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { eggProductionData } from "../../data/ChartData";

function ProductionChart({ darkMode }) {
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
        📈 Grafik Produksi Telur Mingguan
      </h2>

      <div className="w-full h-[250px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={eggProductionData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={darkMode ? "#374151" : "#f0f0f0"}
            />
            <XAxis
              dataKey="day"
              stroke={darkMode ? "#9CA3AF" : "#6B7280"}
              fontSize={12}
            />
            <YAxis
              stroke={darkMode ? "#9CA3AF" : "#6B7280"}
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                border: darkMode ? "1px solid #374151" : "1px solid #E5E7EB",
                borderRadius: "12px",
                color: darkMode ? "#F9FAFB" : "#111827",
              }}
            />
            <Line
              type="monotone"
              dataKey="telur"
              stroke="#3A7D44"
              strokeWidth={3}
              dot={{ r: 5, fill: "#3A7D44" }}
              activeDot={{ r: 7, fill: "#15803d" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ProductionChart;