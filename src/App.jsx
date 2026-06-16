import { useState } from "react";
import axios from "axios";

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  const handleSubmit = async () => {
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
  };

  if (user) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h1>✅ {message}</h1>
        <p>Logged in as: {user.email}</p>
        <button
          onClick={() => {
            setUser(null);
            setMessage("");
          }}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "100px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>
      {!isLogin && (
        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
      )}
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <button
        onClick={handleSubmit}
        style={{
          width: "100%",
          padding: "10px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {isLogin ? "Sign In" : "Sign Up"}
      </button>
      {message && <p style={{ color: "red", marginTop: "10px" }}>{message}</p>}
      <p
        onClick={() => {
          setIsLogin(!isLogin);
          setMessage("");
        }}
        style={{
          textAlign: "center",
          cursor: "pointer",
          color: "#2563eb",
          marginTop: "15px",
        }}
      >
        {isLogin
          ? "Don't have an account? Sign Up"
          : "Already have an account? Sign In"}
      </p>
    </div>
  );
}
