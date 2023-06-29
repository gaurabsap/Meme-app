import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Nav from './pages/navbar/Nav'
import Signup from './pages/auth/Signup'
import Signin from './pages/auth/Signin'
import Tren from './pages/trend/Tren'
import Pop from './pages/Popular/Pop'
import Home from './pages/home/Home'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Create from './pages/create/Create'
import Post from './pages/post/Post'
import Profile from './pages/profile/Profile'
import Forget from './pages/auth/forget'
import Reset from './pages/auth/Reset'
function App() {
  // const [islogin, setisLogin] = useState(false)

  return (
    <>
      <BrowserRouter>
      <Nav/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Signin/>} />
          <Route path='/popular' element={<Pop/>} />
          <Route path='/trending' element={<Tren/>} />
          <Route path='/create' element={<Create/>} />
          <Route path='/post/:id' element={<Post/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/forget-password' element={<Forget/>} />
          <Route path='/reset-password/:token' element={<Reset/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
