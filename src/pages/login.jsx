import React, { useState,useEffect } from 'react';
import "../css/login.css";
import logo from "../assets/icons/whatsLogo.png";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    
    localStorage.clear();


}, []);

  const handleLogin = async () => {
    try {
      const data = {
        correo: correo,
        contrasena: contrasena,
      };

      console.log(data.correo);
      console.log(data.contrasena);

      const response = await fetch('http://localhost:3001/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error al iniciar sesión: ${response.statusText}`);
      }
      const responseData = await response.json();
      localStorage.setItem('UsuarioInfo', JSON.stringify(responseData.usuario));
      navigate("/chat")

    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
    }
  };



  return (
    <div className='divPantalla'>
      <form className='FormLogin'>
        <img src={logo} alt="" className='imagenWhats' />
        <h1>Iniciar sesión</h1>
        <div className='divForm'>
          <h2>Correo</h2>
          <input
            type="email"
            className='inputForm'
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <h2>Contraseña</h2>
          <input
            type="password"
            className='inputForm'
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          <button type="button" className='BotonLogin' onClick={handleLogin}>
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
