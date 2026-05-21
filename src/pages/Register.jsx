import React, { useEffect } from 'react'
import "./css/register.css"
import useAuthStore from '../hooks/useAuthStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialRegisterForm = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
};


const Register = () => {
    const navigate = useNavigate();
    const register = useAuthStore((state) => state.register);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) navigate("/dashboard", { replace: true });
    }, [isAuthenticated, navigate]);
    const [formRegister, setFormRegister] = useState(initialRegisterForm);

    const handleChangeRegister = (e) => {
    setFormRegister({
        ...formRegister,
        [e.target.name]: e.target.value,
    });
  
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(formRegister);
    if (success) {
      navigate("/login", { replace: true });
    }
  };

    return (
        <>
            <div className="rugby-page">
                <div className="rugby-card">
                    <div className="rugby-header">
                        <h1>Club de Rugby</h1>
                        <p>Registro de jugadores y socios</p>
                    </div>

                    <form className="rugby-form">
                        <div className="form-group">
                            <label htmlFor="firstName">Nombre</label>
                            <input type="text" id="firstName" placeholder="Ingresá tu nombre" onChange={handleChangeRegister} value={formRegister.firstName} name="firstName" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Apellido</label>
                            <input type="text" id="lastName" placeholder="Ingresá tu apellido" onChange={handleChangeRegister} value={formRegister.lastName} name="lastName" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Ingresá tu email" onChange={handleChangeRegister} value={formRegister.email} name="email" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" id="password" placeholder="Ingresá tu contraseña" onChange={handleChangeRegister} value={formRegister.password} name="password" />
                        </div>

                        <button type="submit" className="rugby-btn" onClick={handleSubmit}>
                            Registrarse
                        </button>
                    </form>

                    <div className="rugby-footer">
                        <p>
                            ¿Ya tenés cuenta? <a href="/">Iniciá sesión</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register