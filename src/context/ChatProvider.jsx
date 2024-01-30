// ChatProvider.jsx
import React, { useState } from 'react';
import { ChatContext } from './ChatContext';

export const ChatProvider = ({ children }) => {
  const [roomActual, setRoomActual] = useState(1);
  const [socket, setSocket] = useState(null);

  return (
    <ChatContext.Provider
      value={{
        roomActual,
        setRoomActual,
        socket,
        setSocket


        
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
