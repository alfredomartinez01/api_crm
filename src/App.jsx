import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom' // Dependencia para el routing
import Layout from './layout/Layout'
import Inicio from './pages/Inicio'
import NuevoCliente from './pages/NuevoCliente'
import EditarCliente from './pages/EditarCliente'
import VerCliente from './components/VerCliente'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        {/* Ya se pueden hacer rutas anidadas en la V6 */}
        <Route path="clientes" element={<Layout/>}>
          <Route index element={<Inicio/>}/>
          <Route path="nuevo" element={<NuevoCliente/>}/>
          <Route path="editar/:id" element={<EditarCliente/>}/>
          <Route path=":id" element={<VerCliente/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
