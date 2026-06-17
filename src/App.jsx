import { useState } from "react";
import axios from "axios";

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (isLogin) {
        const res = await axios.post("http://localhost:3001/signin", {
          email,
          password,
        });
        setUser(res.data.user);
        setMessage(`Welcome back ${res.data.user.name}!`);
      } else {
        const res = await axios.post("http://localhost:3001/signup", {
          name,
          email,
          password,
        });
        setUser(res.data.user);
        setMessage(`Account created for ${res.data.user.name}!`);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    }
    setLoading(false);
  };

  if (user) {
    return (
      <div
        className={`min-h-screen flex items-start sm:items-center justify-center px-4 pt-6 sm:pt-0 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}
      >
        <div
          className={`p-8 sm:p-10 rounded-2xl text-center shadow-xl w-full max-w-sm ${darkMode ? "bg-gray-800" : "bg-white"}`}
        >
          <div className="text-5xl sm:text-6xl mb-4">✅</div>
          <h1
            className={`text-xl sm:text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            {message}
          </h1>
          <p
            className={`mb-6 text-sm sm:text-base ${darkMode ? "text-gray-400" : "text-gray-500"}`}
          >
            Logged in as: {user.email}
          </p>
          <button
            onClick={() => {
              setUser(null);
              setMessage("");
              setEmail("");
              setPassword("");
            }}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-4 sm:py-4 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}
    >
      <div
        className={`p-6 sm:p-10 rounded-2xl shadow-xl w-full max-w-md ${darkMode ? "bg-gray-800" : "bg-white"}`}
      >
        {/* Dark mode toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-3 py-1 rounded-full text-xs sm:text-sm ${darkMode ? "bg-gray-700 text-yellow-400" : "bg-gray-200 text-gray-700"}`}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Header */}
        <h2
          className={`text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 ${darkMode ? "text-white" : "text-gray-900"}`}
        >
          {isLogin ? "Sign In" : "Sign Up"}
        </h2>

        {/* Name field (signup only) */}
        {!isLogin && (
          <div className="mb-4">
            <label
              className={`text-xs sm:text-sm mb-1 block ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              Full Name
            </label>
            <input
              placeholder="Jesse Kit Ocampo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-3 rounded-lg border focus:outline-none focus:border-blue-500 text-sm sm:text-base ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-gray-50 text-gray-900 border-gray-300"}`}
            />
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label
            className={`text-xs sm:text-sm mb-1 block ${darkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Email
          </label>
          <input
            placeholder="kit@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-3 rounded-lg border focus:outline-none focus:border-blue-500 text-sm sm:text-base ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-gray-50 text-gray-900 border-gray-300"}`}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label
            className={`text-xs sm:text-sm mb-1 block ${darkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Password
          </label>
          <input
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-3 rounded-lg border focus:outline-none focus:border-blue-500 text-sm sm:text-base ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-gray-50 text-gray-900 border-gray-300"}`}
          />
        </div>

        {/* Error message */}
        {message && !user && (
          <p className="text-red-400 text-xs sm:text-sm mb-4 text-center">
            {message}
          </p>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 text-sm sm:text-base"
        >
          {loading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
        </button>

        {/* Toggle */}
        <p
          onClick={() => {
            setIsLogin(!isLogin);
            setMessage("");
          }}
          className={`text-center mt-5 sm:mt-6 cursor-pointer hover:text-blue-400 transition text-xs sm:text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Sign In"}
        </p>
      </div>
    </div>
  );
}
