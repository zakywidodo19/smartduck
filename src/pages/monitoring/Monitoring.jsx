import DashboardLayout from "../../components/layout/DashboardLayout";
import { useRealtimeMonitoring } from "../../hooks/useRealtimeMonitoring";
import {
  FaTemperatureHigh,
  FaTint,
  FaWind,
  FaWater,
  FaPlay,
  FaPause,
  FaSync,
} from "react-icons/fa";

function Monitoring() {
  const {
    sensorData,
    averages,
    alertCount,
    isRunning,
    toggleRunning,
    updateCount,
    updateData,
  } = useRealtimeMonitoring(3000);

  const getStatusColor = (status, darkMode) => {
    switch (status) {
      case "Normal":
        return darkMode
          ? "bg-green-900/40 text-green-400 border-green-800"
          : "bg-green-100 text-green-700 border-green-200";
      case "Warning":
        return darkMode
          ? "bg-yellow-900/40 text-yellow-400 border-yellow-800"
          : "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Bahaya":
        return darkMode
          ? "bg-red-900/40 text-red-400 border-red-800"
          : "bg-red-100 text-red-700 border-red-200";
      default:
        return darkMode
          ? "bg-gray-800 text-gray-400"
          : "bg-gray-100 text-gray-600";
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case "Normal":
        return "bg-green-500";
      case "Warning":
        return "bg-yellow-500";
      case "Bahaya":
        return "bg-red-500 animate-pulse";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <DashboardLayout>
      {(darkMode) => (
        <>
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1
                className={`
                  text-2xl sm:text-3xl font-bold
                  ${darkMode ? "text-white" : "text-gray-800"}
                `}
              >
                Monitoring Realtime
              </h1>
              <p className={`mt-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Simulasi monitoring kondisi kandang secara realtime
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Refresh indicator */}
              <span className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                Update #{updateCount}
              </span>

              <button
                onClick={updateData}
                className={`
                  p-2.5 rounded-xl transition-colors
                  ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"}
                `}
                title="Refresh manual"
              >
                <FaSync className="text-sm" />
              </button>

              <button
                onClick={toggleRunning}
                className={`
                  px-4 py-2.5 rounded-xl font-medium text-sm
                  flex items-center gap-2 transition-colors
                  ${
                    isRunning
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }
                `}
              >
                {isRunning ? (
                  <>
                    <FaPause className="text-xs" /> Pause
                  </>
                ) : (
                  <>
                    <FaPlay className="text-xs" /> Resume
                  </>
                )}
              </button>
            </div>
          </div>

          {/* LIVE INDICATOR */}
          {isRunning && (
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className={`text-xs font-medium ${darkMode ? "text-green-400" : "text-green-600"}`}>
                LIVE — Data diperbarui setiap 3 detik
              </span>
            </div>
          )}

          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Suhu */}
            <div className={`rounded-2xl p-4 sm:p-5 shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-xs sm:text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Suhu Rata-rata
                  </p>
                  <h1 className={`text-xl sm:text-3xl font-bold mt-1 ${darkMode ? "text-white" : "text-gray-800"}`}>
                    {averages.suhu}°C
                  </h1>
                </div>
                <FaTemperatureHigh className="text-red-500 text-2xl sm:text-3xl" />
              </div>
            </div>

            {/* Kelembapan */}
            <div className={`rounded-2xl p-4 sm:p-5 shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-xs sm:text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Kelembapan
                  </p>
                  <h1 className={`text-xl sm:text-3xl font-bold mt-1 ${darkMode ? "text-white" : "text-gray-800"}`}>
                    {averages.kelembapan}%
                  </h1>
                </div>
                <FaTint className="text-blue-500 text-2xl sm:text-3xl" />
              </div>
            </div>

            {/* Kualitas Udara */}
            <div className={`rounded-2xl p-4 sm:p-5 shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-xs sm:text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Kualitas Udara
                  </p>
                  <h1 className={`text-xl sm:text-3xl font-bold mt-1 ${darkMode ? "text-white" : "text-gray-800"}`}>
                    {averages.kualitasUdara}%
                  </h1>
                </div>
                <FaWind className="text-purple-500 text-2xl sm:text-3xl" />
              </div>
            </div>

            {/* Alert Count */}
            <div className={`rounded-2xl p-4 sm:p-5 shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-xs sm:text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Peringatan Aktif
                  </p>
                  <h1 className={`text-xl sm:text-3xl font-bold mt-1 ${alertCount > 0 ? "text-red-500" : "text-green-500"}`}>
                    {alertCount}
                  </h1>
                </div>
                <FaWater className="text-cyan-500 text-2xl sm:text-3xl" />
              </div>
            </div>
          </div>

          {/* SENSOR DETAIL TABLE */}
          <div className={`rounded-2xl shadow-md p-4 sm:p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                Detail Sensor per Kandang
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                    {["Kandang", "Suhu (°C)", "Kelembapan (%)", "Kualitas Udara (%)", "Ketinggian Air (%)", "Status", "Update"].map(
                      (header) => (
                        <th
                          key={header}
                          className={`text-left p-3 text-xs font-semibold uppercase tracking-wider ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>

                <tbody>
                  {sensorData.map((item, index) => (
                    <tr
                      key={index}
                      className={`
                        border-b transition-colors duration-300
                        ${darkMode ? "border-gray-700/50 hover:bg-gray-700/30" : "border-gray-100 hover:bg-gray-50"}
                      `}
                    >
                      {/* Kandang */}
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusDot(item.overallStatus)}`} />
                          <span className={`font-medium text-sm ${darkMode ? "text-white" : "text-gray-800"}`}>
                            {item.kandang}
                          </span>
                        </div>
                      </td>

                      {/* Suhu */}
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                            {item.suhu}°C
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${getStatusColor(item.suhuStatus, darkMode)}`}>
                            {item.suhuStatus}
                          </span>
                        </div>
                      </td>

                      {/* Kelembapan */}
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                            {item.kelembapan}%
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${getStatusColor(item.kelembapanStatus, darkMode)}`}>
                            {item.kelembapanStatus}
                          </span>
                        </div>
                      </td>

                      {/* Kualitas Udara */}
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                            {item.kualitasUdara}%
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${getStatusColor(item.kualitasUdaraStatus, darkMode)}`}>
                            {item.kualitasUdaraStatus}
                          </span>
                        </div>
                      </td>

                      {/* Ketinggian Air */}
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                            {item.ketinggianAir}%
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${getStatusColor(item.ketinggianAirStatus, darkMode)}`}>
                            {item.ketinggianAirStatus}
                          </span>
                        </div>
                      </td>

                      {/* Overall Status */}
                      <td className="p-3">
                        <span
                          className={`
                            px-3 py-1 rounded-full text-xs font-semibold border
                            ${getStatusColor(item.overallStatus, darkMode)}
                          `}
                        >
                          {item.overallStatus}
                        </span>
                      </td>

                      {/* Last Update */}
                      <td className={`p-3 text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                        {item.lastUpdate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SENSOR CARDS GRID (Visual representation per kandang) */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sensorData.map((item, index) => (
              <div
                key={index}
                className={`
                  rounded-2xl p-5 shadow-md border transition-all duration-300
                  ${
                    item.overallStatus === "Bahaya"
                      ? darkMode
                        ? "bg-red-950/30 border-red-800"
                        : "bg-red-50 border-red-200"
                      : item.overallStatus === "Warning"
                        ? darkMode
                          ? "bg-yellow-950/20 border-yellow-800"
                          : "bg-yellow-50 border-yellow-200"
                        : darkMode
                          ? "bg-gray-800 border-gray-700"
                          : "bg-white border-gray-100"
                  }
                `}
              >
                {/* Card Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                    {item.kandang}
                  </h3>
                  <span
                    className={`
                      px-2.5 py-1 rounded-full text-xs font-bold border
                      ${getStatusColor(item.overallStatus, darkMode)}
                    `}
                  >
                    {item.overallStatus}
                  </span>
                </div>

                {/* Sensor Values */}
                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-2.5 rounded-xl ${darkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <FaTemperatureHigh className="text-red-400 text-xs" />
                      <span className={`text-[10px] ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Suhu
                      </span>
                    </div>
                    <p className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
                      {item.suhu}°C
                    </p>
                  </div>

                  <div className={`p-2.5 rounded-xl ${darkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <FaTint className="text-blue-400 text-xs" />
                      <span className={`text-[10px] ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Kelembapan
                      </span>
                    </div>
                    <p className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
                      {item.kelembapan}%
                    </p>
                  </div>

                  <div className={`p-2.5 rounded-xl ${darkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <FaWind className="text-purple-400 text-xs" />
                      <span className={`text-[10px] ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Udara
                      </span>
                    </div>
                    <p className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
                      {item.kualitasUdara}%
                    </p>
                  </div>

                  <div className={`p-2.5 rounded-xl ${darkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <FaWater className="text-cyan-400 text-xs" />
                      <span className={`text-[10px] ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Air
                      </span>
                    </div>
                    <p className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
                      {item.ketinggianAir}%
                    </p>
                  </div>
                </div>

                {/* Last update */}
                <p className={`text-[10px] mt-3 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                  Terakhir diperbarui: {item.lastUpdate}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default Monitoring;
