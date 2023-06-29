import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import loading from '../../assets/lod.gif'
import './profile.scss'
// import time from '../Time'


const Profile = () => {
  const [error, setError] = useState()
  const [load,setLoad] = useState(false)
  const inputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [image, setImage] = useState()
  // console.log(image)
  const [prof, setProf] = useState()
  // console.log(prof)
  const [data, setData] = useState()
  const [inputdata, setInputData] = useState({
    email: "",
    username: "",
  })
  const [pass, setPass]= useState({
    opassword: "",
    npassword: "",
    cpassword: ""
  })

  // console.log(inputdata)
  const [pop, setPop] = useState(false)
  const [popup, setPopup] = useState(false)
  useEffect(() => {
        const GetData = async() => {
            const resq = await axios.get('http://127.0.0.1:4000/api/users/data', {withCredentials: true})
            // console.log(resq.data.data.photo.url)
            setData([resq.data.data])
            setProf(resq.data.data.photo.url)
        }
        GetData()
    },[])

    useEffect(() => {
      if (data) {
        setInputData({
          email: data[0].email,
          username: data[0].username
        });``
      }
    }, [data]);
    const ProfileModal = () => {
      setPop(true)
    }
    const CancelUpdate = (e) => {
      e.preventDefault()
      setPop(false)
    }
    const InputData = (e) => {
      const {name, value} = e.target
      setInputData((prev) => ({
        ...prev,
        [name]: value
      }))
    }
    const handleImageChange = (e) => {
      const file = inputRef.current.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setPreviewImage(reader.result);
          setImage(reader.result)
          inputdata.image = image
          console.log(reader.result)
        };
      } else {
        setPreviewImage(null);
      }
    };
    const UpdateProfile = async(e) => {
      e.preventDefault()
      const data = {
        inputdata, image
      }
      try {
        setLoad(true)
        const resq = await axios.put('http://127.0.0.1:4000/api/users/update/profile', data, {withCredentials: true})
        console.log(resq)
        if(resq.status === 201){
          setLoad(false)
          location.reload()
          console.log(resq)
        }else{
          console.log(resq)
          
          setError(resq.data.message)
          setTimeout(() => {
            setError('')
          }, 3000);
          setLoad(false)
        }
      } catch (error) {
        console.log(error)
        // setError(error.message)
        setLoad(false)
      }
    }

    const InputPassword =(e) => {
      const {name, value} = e.target
      setPass((prev) => ({
        ...prev,
        [name]: value
      }))
    }

    const CancelPassword = (e) => {
      e.preventDefault()
      setPopup(false)
    }
    const UpdatePassword = () => {
      setPopup(true)
    }
    const UpdateNewPassword = async(e) => {
      e.preventDefault()
      try {
        setLoad(true)
        const dat = await axios.put('http://127.0.0.1:4000/api/users/update/pass', pass, {withCredentials: true})
        console.log(dat.data.message)
        if(dat.status === 201){
          setLoad(false)
          location.reload()
        }else{
          setLoad(false)
          setError(dat.data.message)
          setTimeout(() => {
            setError('')
          },3000)
        }
        setLoad(false)
      } catch (error) {
        // console.log(error)
        setError(error.message)
        setLoad(false)
        setTimeout(() => {
          setError('')
        }, 3000);
      }
    }
  return (
    <>
    <div className="profile_data">
      {
        pop ? (
          <>

          <div className="modal-backdrop" onClick={CancelUpdate} />
          <dialog open className='modal'>
            <div className="head">
              <h1>Update profile</h1>
              <form className='prof' >
                <div className="user">
                  <label htmlFor="user">Username</label>
                  <input type="text" name='username' placeholder='Enter your username' value={inputdata.username} onChange={InputData}/>
                </div>
                <div className="email">
                  <label htmlFor="email">Email</label>
                  <input type="email" name='email' placeholder='Enter your Email' value={inputdata.email} onChange={InputData}/>
                </div>
                <div className="upload">
                  <label htmlFor="file">Profile picture</label>
                  <input ref={inputRef} type="file" onChange={handleImageChange} accept="image/*"/>
                  {
                    previewImage ? (
                      <div className="preview">
                      <img src={previewImage} alt="Preview" className='imgdata' />
                    </div>
                    ) : null
                  }
                </div>
                <center>
                  <h3 style={{color: 'red'}}>{error}</h3>
                </center>
                <div className="buttons">
                  <button onClick={CancelUpdate}>Cancel</button>
                  <button onClick={UpdateProfile}>
                    {
                      load ? (<img className='load' src={loading} alt="" />) : "Update"
                    }
                  </button>
                </div>
              </form>
            </div>
        </dialog>
          </>
        ) : null
      }

      {
        popup ? (
          <>
          <div className="modal-password" onClick={CancelPassword} />
          <dialog open className='modal-pass'>
            <div className="head">
              <h1>Change password</h1>
              <form className='pass-form' >
                <div className="old">
                  <label htmlFor="password">old password</label>
                  <input type="password" name='opassword' placeholder='Enter your old password' onChange={InputPassword}/>
                </div>
                <div className="pass">
                  <label htmlFor="password">Password</label>
                  <input type="password" name='npassword' placeholder='Enter new password'  onChange={InputPassword}/>
                </div>
                <div className="cpass">
                  <label htmlFor="password">Confirm password</label>
                  <input type="password" name='cpassword' placeholder='Enter confirm-password' onChange={InputPassword}/>
                </div>
                <center>
                  <h2 style={{color: 'red'}}>{error}</h2>
                </center>
                <div className="buttons">
                <button onClick={CancelPassword}>Cancel</button>
                  <button onClick={UpdateNewPassword}>
                    {
                      load ? (<img className='load' src={loading} alt="" />) : "Update"
                  }
                  </button>
                </div>
              </form>
            </div>
        </dialog>
          </>
        ) : null
      }



      {
        data ? (
          <div className="datas">
            <div className="first_part">
              <div className="head">
                <h1>Profile</h1>
              </div>
              <div className="pic">
                <img src={prof} alt="pic" />
                <button onClick={ProfileModal}>Update profile</button>
              </div>
            </div>
            <div className="details">
              <div className="name">
                <label htmlFor="name">Username</label>
                  <h1>{data[0].username}</h1>
              </div>

              <div className="email">
                <label htmlFor="email">Email</label>
                  <h1>{data[0].email}</h1>
              </div>

              <div className="time">
                <label htmlFor="email">Created at</label>
                  <h1>{data[0].createdAt}</h1>
              </div>

              <button onClick={UpdatePassword} >Change password</button>
            </div>
          </div>
        ) : <img className='loading' src={loading} alt="loading" />
      }
    </div>
    </>
  )
}

export default Profile