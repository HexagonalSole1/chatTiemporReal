import React from 'react'
import "./headerChatMenu.css"

import logoPrueba from "../../../imgs/Triline.png"
function headerChatMenu(prop) {
  return (
    <div className='divHeaderChats'>
      <img src={prop.logoh} alt="" className='logoChatHeader' />
      </div>
  )
}

export default headerChatMenu