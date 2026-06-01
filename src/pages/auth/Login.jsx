import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 600));

    const result = login(formData.email, formData.password);

    if (result.success) {
      Swal.fire({
        title: "Login Berhasil!",
        text: `Selamat datang, ${result.user.name}`,
        icon: "success",
        confirmButtonColor: "#15803d",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } else {
      Swal.fire({
        title: "Login Gagal!",
        text: result.message,
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    }

    setIsLoading(false);
  };

  const demoAccounts = [
    { role: "Admin", email: "admin@smartduck.com", password: "admin123", color: "green" },
    { role: "Petugas", email: "petugas@smartduck.com", password: "petugas123", color: "blue" },
    { role: "Pimpinan", email: "pimpinan@smartduck.com", password: "pimpinan123", color: "orange" },
  ];

  const fillDemo = (email, password) => {
    setFormData({ email, password });
  };

  return (
    <div
      className="
        min-h-screen
        flex items-center justify-center
        bg-gradient-to-br
        from-green-900 via-green-800
        to-emerald-600
        p-4 sm:p-6
      "
    >
      <div
        className="
          bg-white
          w-full max-w-md
          rounded-3xl
          shadow-2xl
          p-6 sm:p-8
          animate-[fadeIn_0.5s_ease-out]
        "
      >
        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🦆</div>

          <h1
            className="
              text-3xl sm:text-4xl font-bold
              text-green-700
            "
          >
            SmartDuck
          </h1>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Smart Farming Management System
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          {/* EMAIL */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Masukkan email"
              className="
                w-full border border-gray-300
                p-3 sm:p-4 rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
                focus:border-transparent
                transition-all
              "
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Masukkan password"
              className="
                w-full border border-gray-300
                p-3 sm:p-4 rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
                focus:border-transparent
                transition-all
              "
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="
              w-full bg-green-700
              hover:bg-green-800
              text-white
              py-3 sm:py-4 rounded-xl
              font-semibold
              transition-all duration-200
              disabled:opacity-60 disabled:cursor-not-allowed
              flex items-center justify-center gap-2
            "
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Memproses...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* DEMO ACCOUNTS */}
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-3 text-center font-medium">
            Demo Login — Klik untuk mengisi otomatis
          </p>

          <div className="space-y-2">
            {demoAccounts.map((acc) => (
              <button
                key={acc.role}
                onClick={() => fillDemo(acc.email, acc.password)}
                className={`
                  w-full text-left p-3 rounded-xl border
                  transition-all duration-200
                  hover:shadow-md
                  ${
                    acc.color === "green"
                      ? "border-green-200 bg-green-50 hover:bg-green-100"
                      : acc.color === "blue"
                        ? "border-blue-200 bg-blue-50 hover:bg-blue-100"
                        : "border-orange-200 bg-orange-50 hover:bg-orange-100"
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span
                      className={`
                        text-xs font-bold uppercase tracking-wider
                        ${
                          acc.color === "green"
                            ? "text-green-700"
                            : acc.color === "blue"
                              ? "text-blue-700"
                              : "text-orange-700"
                        }
                      `}
                    >
                      {acc.role}
                    </span>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {acc.email}
                    </p>
                  </div>

                  <span className="text-xs text-gray-400">
                    {acc.password}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;