import React, { useState, useEffect } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import meme from '../../assets/log.png'
import {IoLogInSharp} from 'react-icons/io5'
import './nav.scss'
import axios from 'axios'


const Nav = () => {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(false)
  const [name, setName] = useState("")
  const ShowProfile = () => {
    setProfile(!profile)
  }

  const [image, setImage] = useState(false)
  const [data, setData] = useState([])



  useEffect(() => {
    const UserProfile = async() => {
      const resq = await axios.get('https://meme-api-26tc.onrender.com/api/users', {withCredentials: true})
      // console.log(resq.data.data.username)
      setData([resq.data.data])
      setImage(resq.data.data.photo.url)
      setName(resq.data.data.username)
    }
    UserProfile();
  },[])


  const Logout = async() => {
    const resq = await axios.get('https://meme-api-26tc.onrender.com/api/users/logout', {withCredentials: true})
    console.log(resq)
    if(resq.status == 200){
      navigate('/')
      location.reload()
    }
  }
  
  return (
    <>
    <nav className='Navbar'>
        <div className="logo">
            <NavLink to='/'>
                <img src={meme} alt="title" />
            </NavLink>
        </div>
        <div className="links">
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/trending'>Trending</NavLink>
            <NavLink to='/popular'>Popular</NavLink>
            {/* <NavLink to='/upload'>Upload</NavLink> */}
            
            {image ? (
              <div className="profile_picture" onClick={ShowProfile}>
                  <img className='profile' src={image} alt='profile-picture'/>
                  <div className={ profile ? "anime profile_links" : "ppp"}>
                    <h1 className='username'>{name}</h1>

                    <NavLink to='/create'>Create</NavLink>
                    <NavLink to='/profile'>Profile</NavLink>
                    <NavLink onClick={Logout} to="#">Logout</NavLink>
                  </div>
              </div>
            ) : <NavLink className='last' to='/signup'>Signup <IoLogInSharp size={25}/></NavLink>}
        </div>
    </nav>
    </>
  )
}

export default Nav
