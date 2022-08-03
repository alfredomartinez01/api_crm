import React from 'react'
import { useNavigate } from 'react-router-dom'

const Cliente = ({ cliente, handleEliminar}) => {
  // Extraemos la información del cliente
  const { nombre, empresa, email, telefono, notas, id } = cliente

  const navigate = useNavigate()

  return (
    <tr className="border-t border-blue-200 hover:bg-gray-100">
      <td className="py-3 text-center">{nombre}</td>
      {/* Table data */}
      <td className="py-3 text-center">
        <p>
          <span className="text-gray-800 font-bold">EMAIL: </span>
          {email}
        </p>
        <p>
          <span className="text-gray-800 font-bold">TELÉFONO: </span>
          {telefono}
        </p>
      </td>
      <td className="py-3 text-center">{empresa}</td>
      <td className="py-3 text-center">
        <button
          className="bg-yellow-500 hover:bg-yellow-600 block w-full text-white p-2 uppercase font-bold text-xs mb-1"
          onClick={() => navigate('/clientes/' + id)}
        >
          Ver
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-xs mb-1" onClick={() => navigate('/clientes/editar/' + id)}>
          Editar
        </button>
        <button className="bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs" onClick={() => handleEliminar(id)}>
          Eliminar
        </button>
      </td>
    </tr>
  )
}

export default Cliente
