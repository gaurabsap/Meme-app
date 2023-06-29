import React, { useState } from 'react'
import axios from 'axios'
import loader from '../../assets/lod.gif'
import './forget.scss'
import {useParams} from 'react-router-dom'
const Reset = () => {
    const {token} = useParams()
    // console.log(token)
    const [load, setLoad] = useState(false)
    const [data, setData] = useState({
        password: "",
        cpassword: ""
    })

  const InputPassword = (e) => {
    const {name, value} = e.target
    setData((prev) => ({
        ...prev,
        [name] : value
    }))
  }
  const [error, setError] = useState()
  const ResetPassword = async(e) => {   
    e.preventDefault()
    try {
      setLoad(true)
      const req = await axios.put(`https://meme-api-26tc.onrender.com/api/users/reset-password/${token}`, data)
      console.log(req)

      if(req.status == 200){
        setError(req.data.message)
        setLoad(false)
      }
    } catch (error) {
      setLoad(false)
      console.log(error)
      setError(error.response.data.message)
    }
    
  }
  return (
    <>
    <div className="forget-password">
        <div className="head">
            <h1>Reset password</h1>
        </div>
        <form className='pass'>
            <div className="password">
                <label htmlFor="email">Password</label>
                <input type="password" placeholder='Enter new password' name='password' onChange={InputPassword}/>
            </div>
            <div className="cpassword">
                <label htmlFor="email">Confirm password</label>
                <input type="password" placeholder='Enter confirm password' name='cpassword' onChange={InputPassword}/>
            </div>
            <button onClick={ResetPassword}>
                {
                 load ? <img className='load' src={loader} alt='loading' /> : 'Update'
                }
            </button>

        </form>
        <center>
        <h1 style={{color: 'red', fontSize: 20, fontWeight: 400}}>{error}</h1>
        </center>
    </div>
    </>
  )
}

export default Reset;
