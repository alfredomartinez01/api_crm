# CRM en react con JSON-server

---

## Routing

Con una librería de routing se puede tener diferentes URL's y mostrar distintos componentes, así como restringir el acceso a ciertas páginas.

Librerías para hacer routing en React:

- React Router (en V6 se le une Reach Router y son los creadores de Remix Run)
- React Location (Creador de React Query)
- Gatsby
- Next.js

Instalamos la librería

```bash
npm install react-router-dom

```

### Estructura del árbol en routing

Se sigue una estructura básica para hacer routing en React:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<BrowserRouter>
    <Routes>
        {/* Ya se pueden hacer rutas anidadas en la V6 */}
        <Route path="" element={<IniciarSesion/>}>
          <Route index element={<LoginForm/>}/>
        </Route>

        <Route path="clientes" element={<Layout/>}>
          <Route index element={<Inicio/>}/>
          <Route path="nuevo" element={<NuevoCliente/>}/>
          <Route path="editar/:id" element={<EditarCliente/>}/>
        </Route>


      </Routes>
</BrowserRouter>
```

**Nota:** Se puede hacer un master page, como lo que pasa en otros frameworks, haciendo uso de Outlet en el componente o ruta padre. Lo que hará, será pegar el componente hijo que contenta el atributo index.

Ejemplo de esto (dentro de Layout):

```Jsx
import { Outlet } from 'react-router-dom'

<div>
      Desde layout
      <Outlet />
</div>
```

### Link

Cuando se usa el react-router-dom, se hace uso de la etiqueta Link en vez de la etiqueta a, entonces con esta etiqueta se puede redigir a una ruta de la aplicación sin que se recargue la página.

### Hook de useLocation()

Este hook sirve para obtener datos de la ruta actual, tales como el hash (lo que va después del #), la key, el pathname (la ruta dentro de la aplicación), search (los parámetros después del ?) y el state.

## Formularios con librería

---

Existen múltiples librerías para hacer formularios en React, así como sus validaciones.

Entre las más conocidas, tenemos:

- Formik (usa Yup con herramientas de validación)
- React Hook Form

Para instalar formik y yup

```bash
npm install formik yup
```

## REST API

---

REST = Representational State Transfer

Debe responder a los Request HTTP: GET (obtener), POST (enviar/crear), PUT/PATCH (actualizar), DELETE (eliminar)

Tiene una forma ordenada y estructurada de poner a disposición los recursos.

### Endpoints de una REST API

Una REST API cuenta con endpoints (o URL's) que se pueden usar para obtener, crear, actualizar o eliminar recursos.

#### Instalando JSON Server para ocuparlo como servidor de datos

```bash
npm install -g json-server
```

Después creamos un archivo.json que sera nuestra base de datos y lo ejecutamos con el siguiente comando:

```bash
json-server --watch db.json --port 4000
```

**Nota:** Debemos colocar el nombre del archivo y el puerto en el que se va a ejecutar.

### Usando Json-server online

Podemos crear un servidor de json server desde my json server (ofrece una página gratuita para eso) simplemente debemos crear un repositorio en github, y luego entrar a la url usando también el nombre de la base de datos:

my-json-server.typicode.com/<user>/<repo>/<db>

Ejemplo:

[https://my-json-server.typicode.com/alfredomartinez01/api_crm/clientes]

## Hook de useParams()

--- 

Este hook sirve para obtener los parámetros de la URL.

## Default props

---

En caso de que un valor de props sea nulo y queramos tener un valor del prop por defecto, podemos ocupar defaultProps.

```jsx
Formulario.defaultProps = {
  cliente: {}
}
```

**Nota:** También se puede apoyar del Nulish coalescing operator (??)
