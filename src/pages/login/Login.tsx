import React, { useState } from "react";
import { useUsers } from "../../hook/useUsers"
import "./Login.css";

const Login: React.FC = () => {
    const { getUser, error } = useUsers();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            const response = await getUser(email, password);
    
            console.log("Respuesta del servidor:", response); // Debugging
    
            if (!response || !response.access_token) {
                alert("Error en el inicio de sesión. Verifica tus credenciales.");
                return;
            }
    
            localStorage.setItem("token", response.access_token);
            alert("Login exitoso");
            window.location.href = "/"; 
        } catch (error) {
            console.error("Error en la autenticación:", error);
            alert("Hubo un error en el inicio de sesión.");
        }
    };

    return (
        <div className="login-container d-flex justify-content-center align-items-center">
            <div className="login-box">
                <h2>Login</h2>
                {error && <p className="text-danger">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
    );
    
};

export default Login;