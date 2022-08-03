import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik' // Importamos los componentes de formik para crear el formulario
import * as Yup from 'yup' // Importamos Yup para validar el formulario
import { useNavigate } from 'react-router-dom' // Importamos useNavigate para redirigir a otra página

const Formulario = ({ cliente }) => {
  /* Schema para un nuevo cliente */
  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, 'El nombre es muy corto') // (número de caracteres, mensaje de error)
      .max(20, 'El nombre es muy largo') // (número de caracteres, mensaje de error)
      .required('El nombre es obligatorio'),
    empresa: Yup.string().required('El nombre de la empresa es obligatoria'),
    email: Yup.string()
      .email('El email no es válido') // Verificamos el emai, y ponemos el mensaje de error
      .required('El email es obligatorio'),
    telefono: Yup.number()
      .positive('El número no es válido')
      .integer('El número no es válido')
      .typeError('El número no es válido'), // Verifivamos el tipo de dato
    notas: Yup.string().max(200, 'La nota es muy largo'), // Verificamos el número de caracteres
  })

  /* HOOKS */
  const navigate = useNavigate() // Importamos navigate para redirigir a otra página

  const handleSubmit = async (values) => {
    try {
      let respuesta
      if (cliente.id) {
        const url = `http://localhost:4000/clientes/${cliente.id}`
        // Hacemos la petición de actualizar hacia el JSON-Server
        respuesta = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      } else {
        const url = 'http://localhost:4000/clientes'
        // Hacemos la petición hacia el JSON-Server
        respuesta = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      }

      const resultado = await respuesta.json()
      console.log(resultado)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center ">
        {cliente?.nombre ? 'Editar cliente' : 'Agregar nuevo cliente'}
        {/* Comprobamos si exite nombre y si existe nombre */}
      </h1>

      {/* FORMULARIO CON FORMIK */}
      <Formik
        /* Declaramos sus valores iniciales */
        initialValues={{
          nombre: cliente?.nombre ?? '', // Si cliente existe, le asignamos el nombre, pero si está como undefined, le asignamos un string vacío (?? comprueba undefined)
          empresa: cliente?.empresa ?? '',
          email: cliente?.email ?? '',
          telefono: cliente?.telefono ?? '',
          notas: cliente?.notas ?? '',
        }}
        /* Declaramos que se pueda reinicializar valores para poder ocupar el cliente de props y que se vea en el formulario*/
        enableReinitialize={true}
        /* Declaramos el submit (values contiene todos los valores del form)*/
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values)

          resetForm()
          navigate('/clientes')
        }}
        /* Validation Schema */
        validationSchema={nuevoClienteSchema}
      >
        {/* Formulario dentro de un return de un arraw function para manejar los errores*/}
        {({ error, touched }) => {
          /* Se extrae error de un objeto que tiene muchos más elementos */ /* touched indica qué field fue el que se modificó después de haber dejado el field */
          return (
            <Form>
              <div className="mb-4">
                <label htmlFor="nombre" className="text-gray-880">
                  Nombre:
                </label>
                <Field
                  id="nombre"
                  name="nombre"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50 outline-slate-600 outline-1"
                  placeholder="Nombre del cliente"
                />
                <ErrorMessage
                  name="nombre"
                  component="div"
                  className="text-red-500 mt-1"
                />
                {/* Le indicamos el component="div" para poder agregarle estilos */}
              </div>
              <div className="mb-4">
                <label htmlFor="empresa" className="text-gray-880">
                  Empresa:
                </label>
                <Field
                  id="empresa"
                  name="empresa"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50 outline-slate-600 outline-1"
                  placeholder="Empresa del cliente"
                />
                <ErrorMessage
                  name="empresa"
                  component="div"
                  className="text-red-500 mt-1"
                />
                {/* Le indicamos el component="div" para poder agregarle estilos */}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="text-gray-880">
                  Email:
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className="mt-2 block w-full p-3 bg-gray-50 outline-slate-600 outline-1"
                  placeholder="Email del cliente"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 mt-1"
                />
                {/* Le indicamos el component="div" para poder agregarle estilos */}
              </div>
              <div className="mb-4">
                <label htmlFor="telefono" className="text-gray-880">
                  Telefono:
                </label>
                <Field
                  id="telefono"
                  name="telefono"
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-50 outline-slate-600 outline-1"
                  placeholder="Teléfono del cliente"
                />
                <ErrorMessage
                  name="telefono"
                  component="div"
                  className="text-red-500 mt-1"
                />
                {/* Le indicamos el component="div" para poder agregarle estilos */}
              </div>
              <div className="mb-4">
                <label htmlFor="notas" className="text-gray-880">
                  Notas:
                </label>
                <Field
                  as="textarea"
                  id="notas"
                  name="notas"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50 outline-slate-600 outline-1"
                  placeholder="Notas del cliente"
                />
                <ErrorMessage
                  name="notas"
                  component="div"
                  className="text-red-500 mt-1"
                />
                {/* Le indicamos el component="div" para poder agregarle estilos */}
              </div>

              <Field
                type="submit"
                value={cliente?.nombre ? 'Guardar cambios' : 'Agregar cliente'}
                className="bg-blue-800 w-full text-white uppercase font-bold text-lg hover:cursor-pointer py-2 rounded-md"
              />
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}
Formulario.defaultProps = {
  cliente: {},
}

export default Formulario
