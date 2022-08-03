import { useEffect, useState } from 'react'
import Cliente from '../components/Cliente'

const Inicio = () => {
  // Consultamos los clientes en la API
  const [clientes, setClientes] = useState([])

  useEffect(() => {
    const consultarAPI = async () => {
      try {
        const url = 'http://localhost:4000/clientes'

        const respuesta = await fetch(url)
        const clientes = await respuesta.json()

        setClientes(clientes)
      } catch (error) {
        console.log(error)
      }
    }
    consultarAPI()
  }, [])

  /* AUX FUNCTIONS */
  const handleEliminar = async (id) => {
    const confirmado = confirm("¿Deseas eliminar este cliente?")

    if(confirmado){
      try{
        const url = `http://localhost:4000/clientes/${id}`
        const respuesta = await fetch(url, {
          method: 'DELETE'
        })

        const resultado = await respuesta.json()
        console.log(resultado);

        // Actualizamos el state
        setClientes(clientes.filter(cliente => cliente.id !== id))
      } catch(error){

      }
    }
  }

  return (
    <>
      <div className="font-black text-4xl text-blue-900">Clientes</div>
      <p className="mt-3">Administra tus clientes.</p>

      {/* Tabla de los clientes */}
      <table className=" w-full max-w-full mt-5 table-auto shadow bg-white">
        {/* Parte superior de la tabla */}
        <thead className="bg-blue-800 text-white">
          <tr>
            {/* Table row */}
            <th className="p-2">Nombre</th>
            {/* Table head */}
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>

        {/* Parte inferior de la tabla */}
        <tbody>
          {clientes.map((cliente) => (
            <Cliente
              key={cliente.id}
              cliente={cliente}
              handleEliminar={handleEliminar}
            />
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Inicio
