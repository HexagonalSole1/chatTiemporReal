import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ChatProvider } from '../context/ChatProvider';
import "../css/App.css";
import Chat from '../pages/chat';
import Login from '../pages/login';
import PrivateRoute from './PrivateRoute';

const ChatApp = () => {
  const UsuarioInfo = localStorage.getItem('UsuarioInfo'); // Reemplaza 'tu_clave_de_local_storage' con la clave que estás usando
  
  return (
    <>
      <ChatProvider>
        <BrowserRouter>
          <Routes>
            {/* Ruta Login */}
            <Route path="/" element={<Login />} />
            <Route path="/chat" element={<PrivateRoute element={<Chat />} />}/>
            
            

         

          </Routes>
        </BrowserRouter>
      </ChatProvider>
    </>
  );
};

export default ChatApp;
