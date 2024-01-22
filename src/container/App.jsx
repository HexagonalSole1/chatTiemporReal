import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import "../css/App.css"

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(''); // Nuevo estado para la sala actual

  useEffect(() => {
    const newSocket = io('http://localhost:3001');

    newSocket.on('connect', () => {
      console.log('Conectado al servidor Socket.IO');

      joinRoom(newSocket, 'Room1'); 
    });

    newSocket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const joinRoom = (socket, roomName) => {
    socket.emit('join room', roomName);
    console.log(`Unido a la sala ${roomName}`);
    setCurrentRoom(roomName);
  };

  const handleSendMessage = () => {
    if (socket && currentRoom) {
      socket.emit('chat message', "Enviado por :" + newMessage, currentRoom);
    }

    setNewMessage('');
  };

  return (


    <div className='divContainer'>

      <div className='divNameRoom'>
        <h2>Chat en {currentRoom}</h2>
      </div>

      <div className='divMessage'>
        
          {messages.map((msg, index) => (
            <div key={index} className='mensaje'>{msg}</div>
          ))}
        
      </div>


      <div className='divSend'>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Enviar mensaje</button>
      </div>
    </div>
  );
};

export default ChatApp;
