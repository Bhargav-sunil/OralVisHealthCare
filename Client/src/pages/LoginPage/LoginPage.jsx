import React, { useState } from "react";
import api from "../../api/axios";
import { saveAuth } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [showCredentials, setShowCredentials] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", { email, password });
      saveAuth(res.data.token, res.data.user);
      if (res.data.user.role === "technician") navigate("/upload");
      else navigate("/viewer");
    } catch (error) {
      setErr(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome to OralVis</h1>
        <p className="login-subtitle">
          Login as Technician or Dentist to continue
        </p>

        <form onSubmit={handleLogin} className="login-form">
          <TextInput
            id="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <TextInput
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          {err && (
            <div className="login-error" role="alert" aria-live="polite">
              {err}
            </div>
          )}

          <div className="login-footer">
            <Button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </div>
          <div>
            <button
              type="button"
              className="login-credentials-toggle"
              onClick={() => setShowCredentials(!showCredentials)}
            >
              {showCredentials
                ? "Hide Default Credentials"
                : "Show Default Credentials"}
            </button>

            <div className={`login-defaults ${showCredentials ? "show" : ""}`}>
              <strong>Default accounts:</strong>
              <br />
              <span>Technician: tech@example.com / tech123</span>
              <br />
              <span>Dentist: dentist@example.com / dentist123</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
