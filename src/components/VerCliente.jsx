import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from './Spinner'

const VerCliente = () => {
  // Obtenemos el id de la url
  const { id } = useParams()

  /* STATES */
  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(true)

  // Obtenemos el cliente de la API
  useEffect(() => {
    const obtenerClienteAPI = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/clientes/${id}`
        const respuesta = await fetch(url)
        const cliente = await respuesta.json()

        setCliente(cliente)

      } catch (error) {
        console.log(error)
      }
      
      setCargando(!cargando)
    }
    obtenerClienteAPI()
  }, [])

  return (
    <div>
      {
        cargando ? <Spinner/> : // cuando deje de cargar va continuar 
        (Object.entries(cliente).length == 0 ? ( // En caso de que no exista el id
          <p>No hay resultados</p>
        ) : (
          <>
            <div className="font-black text-4xl text-blue-900">Ver cliente</div>
            <p className="mt-3">Información del cliente</p>

            <p className="text-3xl text-gray-600 mt-10">
              <span className="text-gray-700 uppercase font-bold">
                Cliente:{' '}
              </span>{' '}
              {cliente.nombre}
            </p>
            <p className="text-2xl text-gray-600 mt-2">
              <span className="text-gray-700 uppercase font-bold">
                E-mail:{' '}
              </span>{' '}
              {cliente.email}
            </p>
            <p className="text-2xl text-gray-600 mt-2">
              <span className="text-gray-700 uppercase font-bold">
                Teléfono:{' '}
              </span>{' '}
              {cliente.telefono}
            </p>
            <p className="text-2xl text-gray-600 mt-2">
              <span className="text-gray-700 uppercase font-bold">
                Empresa:{' '}
              </span>{' '}
              {cliente.empresa}
            </p>

            {/* Comprobando si existen notas para mostrarlas o no */}
            {cliente.notas && (
              <p className="text-2xl text-gray-600 mt-2">
                <span className="text-gray-700 uppercase font-bold">
                  Notas:{' '}
                </span>{' '}
                {cliente.notas}
              </p>
            )}
          </>
        ))
      }
    </div>
  )
}

export default VerCliente
