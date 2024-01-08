import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/SignUp'
import Dashboard from './pages/Dashboard'
// import Navbar from './pages/Navbar'
import AddAgentForm from './pages/AddAgentForm'

const App = () => {
  return (
    <BrowserRouter>
        {/* <Navbar/> */}
          <Routes>
            <Route path='/' element={<Signin/>} />
            <Route path='/register' element={<Signup/>} />
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/addRepoAgent' element={<AddAgentForm />} />
          </Routes>
    </BrowserRouter>
  )
}

export default App