import React, { useState } from 'react'
import './auth.scss'
import signup from '../../assets/do.png'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import loading from '../../assets/lod.gif'

const Signup = () => {
    const [error, setError] = useState()
    const [load,setLoad] = useState(false)
    const navigate = useNavigate()
    const [data, setData] = useState({
        "username": "",
        "email": "",
        "password": "",
        "cpassword": ""
    })
    const UserInput = (e) => {
        const {name, value} = e.target
        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const SubmitForm = async(e) => {
        e.preventDefault()
        try {
            setLoad(true)
            const resq=  await axios.post('https://meme-api-26tc.onrender.com/api/users/register', data)
            console.log(resq)
            if(resq.status == 201){
                setLoad(false)
                navigate('/login')
            }
        } catch (error) {
            setLoad(false)
            console.log(error.response.data.message)
            setError(error.response.data.message)
            setTimeout(() => {
            setError('')
            }, 4000);
            
        }
    }
  return (
    <div className="signup">
        <div className="first_part">
            <div className="head">
                <h1>Welcome</h1>
                <p>Signup you account here...</p>
            </div>
            <form className='form'>
                <div className="username">
                    <label htmlFor="label">Username</label>
                    <input type="text" placeholder='Enter your username' onChange={UserInput} name='username'/>
                </div>

                <div className="email">
                    <label htmlFor="label">Email</label>
                    <input type="email" placeholder='Enter your email' name='email' onChange={UserInput}/>
                </div>
                <div className="password">
                    <label htmlFor="label">Password</label>
                    <input type="password" placeholder='Enter your password' name='password' onChange={UserInput}/>
                </div>

                <div className="cpassword">
                    <label htmlFor="label">Confirm-password</label>
                    <input type="password" placeholder='Enter your confirm-password' name='cpassword' onChange={UserInput}/>
                </div>
                <center>
                    <h4 className='error'>{error}</h4>
                </center>
                <button onClick={SubmitForm}>
                    {load ? (<img className='load' src={loading} alt="" />) : "Signup"}
                </button>
                <center>
                    <h3>Or</h3>
                </center>
                <p className='lasts'>
                  Already have an account? <NavLink to='/login'>Login</NavLink>
                </p>
            </form>
        </div>
        <div className="second_part">
            <img src={signup} alt="Signup" />
        </div>
    </div>
  )
}

export default Signup
