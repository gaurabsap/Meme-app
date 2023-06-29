import React, { useState } from 'react'
import axios from 'axios'
import loader from '../../assets/lod.gif'
import './forget.scss'
const Forget = () => {
  const [load, setLoad] = useState(false)
  const [email, setEmail] = useState()

  const data = {
    email: email
  }
  const [error, setError] = useState()
  const ForgetPassword = async(e) => {   
    e.preventDefault()
    try {
      setLoad(true)
      const req = await axios.post('http://127.0.0.1:4000/api/users/forget-password', data)
      if(req.status == 200){
        setError(req.data.message)
        setEmail('')
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
            <h1>Forget password</h1>
        </div>
        <form className='pass'>
            <div className="email">
                <label htmlFor="email">Email</label>
                <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <button onClick={ForgetPassword}>
                {
                 load ? <img className='load' src={loader} alt='loading' /> : 'Send link'
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

export default Forget;