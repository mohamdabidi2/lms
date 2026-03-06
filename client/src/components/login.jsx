import { useState } from "react";
import { loginUser } from "../services/authService";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null); // { type: "error"|"success", text }
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await loginUser(form);
      if (res.data.ok) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setMessage({ type: "success", text: "Login successful! Redirecting…" });
        setTimeout(() => {
          navigate("/dashboard")
        }, 1500);
      } else {
        setMessage({ type: "error", text: "Invalid email or password." });
      }
    } catch {
      setMessage({ type: "error", text: "Something went wrong. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Brand */}
        <div className="auth-brand">
          <div className="brand-icon">
            <span role="img" aria-label="graduation cap">🎓</span>
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to your LMS account</p>
        </div>

        {/* Message */}
        {message && (
          <div className={`auth-message ${message.type}`}>
            {message.type === 'error' ? '⚠️ ' : '✅ '}
            {message.text}
          </div>
        )}

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?
          <a href="/register">Create one</a>
        </p>
      </div>
    </div>
  );
};

export default Login;