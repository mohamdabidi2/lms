import { useState } from "react";
import { registerUser } from "../services/authService";
import "../App.css";

const Register = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            const res = await registerUser(form);
            if (res.data.ok) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                setMessage({ type: "success", text: "Account created! Redirecting…" });
            } else {
                setMessage({ type: "error", text: "Registration failed. Please try again." });
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
                        <span role="img" aria-label="pencil">✏️</span>
                    </div>
                    <h1>Create Account</h1>
                    <p>Join your LMS today</p>
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
                        <label htmlFor="name">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                        />
                    </div>

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
                        {loading ? "Creating account..." : "Create Account"}
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account?
                    <a href="/login">Sign in</a>
                </p>
            </div>
        </div>
    );
};

export default Register;