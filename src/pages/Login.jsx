
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../hooks/useAuthStore";
import "./css/login.css";

const initialLoginForm = {
  email: "",
  password: "",
};

const Login = () => {
  const [formlogin, setformlogin] = useState(initialLoginForm);
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);
  const navigate = useNavigate();

  const handleChangelogin = (e) => {
    setformlogin({
      ...formlogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formlogin);
    if (success) {
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <div className="rugby-page">
      <article className="rugby-card">
        <header className="rugby-header">
          <h1>Club de Rugby</h1>
          <p>Ingreso de jugadores</p>
        </header>

        <form className="rugby-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formlogin.email}
              onChange={handleChangelogin}
              placeholder="Ingresá tu email"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formlogin.password}
              onChange={handleChangelogin}
              placeholder="Ingresá tu contraseña"
              autoComplete="current-password"
            />
          </div>

          {error && <div className="rugby-error">{error}</div>}

          <button className="rugby-btn" type="submit" disabled={loading}>
            {loading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>

        <footer className="rugby-footer">
          <p>
            ¿No tenés cuenta? <Link to="/register">Registrate</Link>
          </p>
        </footer>
      </article>
    </div>
  );
};

export default Login;
