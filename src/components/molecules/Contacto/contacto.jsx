import React, { useContext } from 'react';
import "./contacto.css";
import { ChatContext } from '../../../context/ChatContext';

function Contacto(props) {
    const {  setRoomActual } = useContext(ChatContext);

    const handleClicDiv = () => {
      console.log(props.idChat);
            setRoomActual(props.idChat);
            console.log('¡Se hizo clic en el div!');
        
    };

    return (
        <div className='divContacto' onClick={handleClicDiv}>
            <div className='divLogo'>
                <img src={props.logoChat} alt="" className='logoUsuario' />
            </div>
            <div className='divInfo'>
                <p className='NombreContacto'>{props.nombre}</p>
                <p className='UltimoMensaje'>{props.descripcion}</p>
            </div>
            <div className='divFecha'>
                <p>{props.fecha}</p>
            </div>
        </div>
    );
}

export default Contacto;
