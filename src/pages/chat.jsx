import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import "../css/chat.css";
import Swal from 'sweetalert2'

import HeaderChatMenu from '../components/molecules/headerChatMenu/headerChatMenu';
import Buscador from "../components/molecules/BuscadorChats/Buscador.jsx";
import Contacto from '../components/molecules/Contacto/contacto.jsx';
import SendMessage from '../components/molecules/SendMessage/SendMessage.jsx';
import { ChatContext } from '../context/ChatContext.jsx';

function Chat() {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [currentRoom, setCurrentRoom] = useState('');
    const usuarioInfo = JSON.parse(localStorage.getItem('UsuarioInfo'));
    const [chatsData, setChatsData] = useState([]);
    const [chatsDataPriv, setChatsDataPriv] = useState([]);
    const { roomActual, setRoomActual, socket, setSocket } = useContext(ChatContext);

    const [notificaciones, setNotificaciones] = useState([]);
    const [tamanoNoti, setTamanoNoti] = useState();
    const [actualizaciones, setActualizaciones] = useState([]);


    const joinRoom = (socket, roomName) => {
        socket.emit('join room', roomName);
        console.log(`Unido a la sala ${roomName}`);
        setCurrentRoom(roomName);
    };

    const conexionSocket = (chats) => {
        const newSocket = io('http://localhost:3001',{
            auth: {
                token: "usuarioInfo.token"
            }
        });
        newSocket.on('connect', () => {
            console.log('Conectado al servidor Socket.IO');

            chats.forEach((element) => {
                joinRoom(newSocket, element.idChat);
            });
        });

        newSocket.on('chat message', (msg, roomName) => {
            console.log(msg)
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }

    const fetchChatsPriv = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/chats/priv/${usuarioInfo.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            if (!response.ok) {
                throw new Error(`Error al obtener chats: ${response.statusText}`);
            }
    
            const chatsPriv = await response.json();
    
            return chatsPriv.usuario;
        } catch (error) {
            console.error('Error al obtener chats privados:', error.message);
            throw error;
        }
    };
    const fetchChats = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/chats/${usuarioInfo.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`Error al obtener chats: ${response.statusText}`);
            }

            const chatsData2 = await response.json();
            setChatsData(chatsData2.usuario);

            return chatsData2.usuario;
        } catch (error) {
            console.error('Error al obtener chats:', error.message);
            throw error;
        }
    };

    useEffect(() => {
        fetchChatsPriv()
        .then((res) => {
            console.log(res);
            setChatsDataPriv(res);

        })
        .catch(error => {
            console.error('Error en la cadena de promesas:', error);
        });


        fetchChats()
            .then((res) => {
                console.log(res);
                setChatsData(res)
                return conexionSocket(res);
            })
            .catch(error => {
                console.error('Error en la cadena de promesas:', error);
            });
            

    }, []);

    // ...

useEffect(() => {
    const fetchNotificaciones = async () => {
        try {
            const response = await fetch('http://localhost:3001/notificaciones');
            if (!response.ok) {
                throw new Error(`Error al obtener notificaciones: ${response.statusText}`);
            }
            const data = await response.json();
            const nuevasNotificaciones = data.notificaciones.filter(notif => !notificaciones.includes(notif));
         
            console.log(nuevasNotificaciones);

            if (nuevasNotificaciones.length !== tamanoNoti) {

                alert("Notificacion Nueva :" + nuevasNotificaciones[nuevasNotificaciones.length-1].cuerpo)
                setTamanoNoti(nuevasNotificaciones.length);
            }

            setNotificaciones(data.notificaciones);

        } catch (error) {
            console.error('Error al obtener notificaciones:', error.message);
        }
    };

    fetchNotificaciones();

    const intervalId = setInterval(() => {
        fetchNotificaciones();
    }, 5000);

    return () => clearInterval(intervalId);

    // Agrega tamanoNoti como dependencia
}, [tamanoNoti]);

const obtenerActualizaciones = async () => {
    try {
      const response = await fetch('http://localhost:3001/actualizaciones');
      const data = await response.json();
      setActualizaciones(data.actualizaciones);
    } catch (error) {
      console.error('Error al obtener actualizaciones:', error.message);
    } finally{
        suscribirseNuevaActualizacion();
    }
  };

  const suscribirseNuevaActualizacion = async () => {
    try {
        const response = await fetch('http://localhost:3001/nueva-actualizacion');
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();

        Swal.fire({
            title: 'Nueva Actualización',
            text: `Versión: ${data.nuevaActualizacion.actualizacion}`,
            icon: 'info',
            confirmButtonText: 'Aceptar',
        });

        obtenerActualizaciones();
    } catch (error) {
        console.error('Error al suscribirse a nuevas actualizaciones:', error.message);
    }
};

  useEffect(() => {
    obtenerActualizaciones();
    suscribirseNuevaActualizacion();

    return () => {
      // Limpiar cualquier recurso si es necesario al desmontar el componente
    };
  }, []);

    

    return (
        <>
            <header className='headerChat'></header>
            <div className='divContainer'>
                <div className='divIzquierdo'>
                    <HeaderChatMenu logoh={usuarioInfo.logo} />
                    <Buscador />

                    {chatsData.map(chatgroup => (
                        <Contacto
                            key={chatgroup.idChat}
                            idChat={chatgroup.idChat}
                            logoChat={chatgroup.logoGrupo}
                            nombre={chatgroup.nombre}
                            descripcion={chatgroup.descripcion}
                        />
                    ))}
                    {chatsDataPriv.map(chatgroup => (
                        <Contacto
                            key={chatgroup.usuarioId}
                            idChat={chatgroup.ws}
                            logoChat={chatgroup.logo}
                            nombre={chatgroup.nombre}
                            descripcion={chatgroup.descripcion}
                        />
                    ))}


                </div>
                <div className='divDerecho'>
                    <div className='divMensajes'>
                        {/* Renderizar los mensajes en algún lugar de tu componente */}
                        <ul>
                        {messages
                            .filter((message) => message.roomName === ("Room "+roomActual))
                
                            .map((message, index) => (
                                <div key={index} className='divMensaje'>
                                    <p>{message.msg}</p>
                                </div>
                            ))}

                            
                    </ul>

                    </div>
                    <SendMessage />
                </div>
            </div>
        </>
    );
}

export default Chat;
