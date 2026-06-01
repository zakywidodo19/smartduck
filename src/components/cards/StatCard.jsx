function StatCard({ title, value, color, darkMode, icon, subtitle }) {
  return (
    <div
      className={`
        p-5 sm:p-6 rounded-2xl shadow-md transition-all duration-300
        hover:shadow-lg hover:-translate-y-0.5
        ${darkMode ? "bg-gray-800" : "bg-white"}
      `}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3
            className={`text-xs sm:text-sm mb-2 font-medium ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {title}
          </h3>

          <h1 className={`text-2xl sm:text-3xl font-bold ${color}`}>
            {value}
          </h1>

          {subtitle && (
            <p className={`text-xs mt-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
              {subtitle}
            </p>
          )}
        </div>

        {icon && (
          <span className="text-2xl sm:text-3xl opacity-80">
            {icon}
          </span>
        )}
      </div>
    </div>
  );
}

export default StatCard;