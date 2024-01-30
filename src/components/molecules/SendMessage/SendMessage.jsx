import React, { useContext, useState } from 'react';
import "./SendMessage.css";
import caraFeliz from "../../../assets/icons/Feliz.svg";
import send from "../../../assets/icons/send.svg";
import { ChatContext } from '../../../context/ChatContext';

function SendMessage() {
    const { roomActual, socket } = useContext(ChatContext);
    const [newMessage, setNewMessage] = useState('');
    const usuarioInfo = JSON.parse(localStorage.getItem('UsuarioInfo'));

    const handleSendMessage = (event) => {
        event.preventDefault();

        if (socket && roomActual) {
            socket.emit('chat message', newMessage, roomActual,usuarioInfo.id);

            setNewMessage('');
        }
    };

    const handleChange = (event) => {
        setNewMessage(event.target.value);
    };

    return (
        <form className='sendContainer' onSubmit={handleSendMessage}>
            <img src={caraFeliz} alt="" />
            <input
                type="text"
                className='inputMessage'
                placeholder='Escribe un mensaje'
                value={newMessage}
                onChange={handleChange}
            />
            <img src={send} alt="" onClick={handleSendMessage} />
        </form>
    );
}

export default SendMessage;
