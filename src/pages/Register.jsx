import React from 'react'
import "./css/register.css"



const Register = () => {
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
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" id="nombre" placeholder="Ingresá tu nombre" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="apellido">Apellido</label>
                            <input type="text" id="apellido" placeholder="Ingresá tu apellido" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Ingresá tu email" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" id="password" placeholder="Ingresá tu contraseña" />
                        </div>

                        <button type="submit" className="rugby-btn">
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