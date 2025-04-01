import { useState } from 'react'

import './App.css'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import ChatPage from './components/ChatPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
    <Route path='/' Component={Home}/>
    <Route path='/chats' Component={ChatPage}/>
    </Routes>
  )
}

export default App
