import React from 'react'
import "./Buscador.css"
import buscador from "../../../assets/icons/search.svg"
import filter from "../../../assets/icons/filter_list.svg"
function Buscador() {
  return (
    <div className='divBuscador'>
     <input type="text" className='buscador' placeholder='Busca un chat o inicia uno nuevo' />
      <img src={buscador} alt="" className='buscadorIcon' />
      <div className='divFilterIcon'>
      <img src={filter} alt="" className='filterIcon' />
      </div>
 

    </div>
  )
}

export default Buscador