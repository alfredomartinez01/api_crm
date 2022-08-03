import React from 'react'
import Formulario from '../components/Formulario'


const NuevoCliente = () => {
  return (
    <>
    <div className='font-black text-4xl text-blue-900'>Nuevo cliente</div>
    <p className="mt-3">Llena los siguientes campos para registrar un cliente</p>
    <Formulario/>
    </>
  )
}

export default NuevoCliente