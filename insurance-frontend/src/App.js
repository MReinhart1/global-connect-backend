import { Route, Routes } from 'react-router-dom'

import Dashboard from './views/Dashboard'
import CreatePolicy from './views/CreatePolicy'
import ViewPolicy from './views/ViewPolicy'
import Login from './views/Login'
import Register from './views/Register'



function App() {
  return (
    <>
  <Routes>
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/policy' element={<Dashboard/>} />
    <Route path='/create' element={<CreatePolicy/>} />
    <Route path='/policy:id' element={<ViewPolicy/>} />
  </Routes>
  </>
  )
}

export default App;
