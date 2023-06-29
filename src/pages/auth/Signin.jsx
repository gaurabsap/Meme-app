import React, { useState } from 'react'
import signup from '../../assets/do.png'
import { NavLink } from 'react-router-dom'
import './auth.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import loading from '../../assets/lod.gif'

const Signin = () => {
    
    const navigate = useNavigate()
    const [load,setLoad] = useState(false)

    const [error, setError] = useState()
    const [data, setData] = useState({
        "email": "",
        "password": "",
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
            const resq=  await axios.post('http://127.0.0.1:4000/api/users/login', data, { withCredentials: true })
            console.log(resq)
            if(resq.status == 200){
                
                navigate('/')
                location.reload()
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
    <>
    <div className="signin">
        <div className="first_part">
            <div className="head">
                <h1>Welcome back</h1>
                <p>Login your account here</p>
            </div>
            <form className='form'>

                <div className="email">
                    <label htmlFor="label">Email</label>
                    <input type="email" placeholder='Enter your email' name='email' onChange={UserInput}/>
                </div>
                <div className="password">
                    <label htmlFor="label">Password</label>
                    <input type="password" placeholder='Enter your password' name='password' onChange={UserInput}/>
                </div>
                <div className="forget">
                    <NavLink to='/forget-password'>Forget password?</NavLink>
                </div>
                <center>
                    <h4 className='error'>{error}</h4>
                </center>
                <button onClick={SubmitForm}>
                    {load ? (<img className='load' src={loading} alt="" />) : "Login"}
                </button>
                <center>
                    <h3>Or</h3>
                </center>
                <p className='lasts'>
                  Create an account. <NavLink to='/signup'>Signup</NavLink>
                </p>
            </form>
        </div>
        <div className="second_part">
            <img src={signup} alt="Signup" />
        </div>
    </div>
    </>
  )
}

export default Signin