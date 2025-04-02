import { useState } from 'react'

import './App.css'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import ChatPage from './components/ChatPage'
import SignUp from './components/SignUp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
    <Route path='/' Component={Home}/>
    <Route path='/chats' Component={ChatPage}/>
    <Route path='/sign-up' Component={SignUp}/>
    </Routes>
  )
}

export default App
