import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import Formulario from '../components/Formulario'
import Spinner from '../components/Spinner'

const EditarCliente = () => {
  // Obtenemos el id de la url
  const { id } = useParams()
  const [cargando, setCargando] = useState(true)

  /* STATES */
  const [cliente, setCliente] = useState({})

  // Obtenemos el cliente de la API
  useEffect(() => {
    const obtenerClienteAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`
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
    <>
      {cargando ? (
        <Spinner /> // cuando deje de cargar va continuar
      ) : (
        <>
          <div className="font-black text-4xl text-blue-900">Editar cliente</div>
          <p className="mt-3">Utiliza este formulario para editar la información del cliente</p>

          {
            cliente?.nombre ? (
              <Formulario cliente={cliente} />
            ) : <p>Cliente ID no válido</p>
          }
          
        </>
      )}
    </>
  )
}

export default EditarCliente
