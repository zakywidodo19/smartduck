import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { monthlyProductionData } from "../../data/ChartData";

function MonthlyChart({ darkMode }) {
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
        📊 Produksi Telur Bulanan
      </h2>

      <div className="w-full h-[250px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyProductionData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={darkMode ? "#374151" : "#f0f0f0"}
            />
            <XAxis
              dataKey="bulan"
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
            <Bar
              dataKey="telur"
              fill="#15803d"
              radius={[8, 8, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MonthlyChart;
