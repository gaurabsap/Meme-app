import Search from '../../search/Search'


import React, { useEffect, useState } from 'react'
import axios from 'axios'
import time from '../Time'
import {BsThreeDotsVertical} from 'react-icons/bs'
import './tren.scss'
import loading from '../../assets/loading.gif'
import { NavLink } from 'react-router-dom'
import {saveAs} from 'file-saver'
import ReactPlayer from 'react-player'



const Tren = () => {
  const [data, setData] = useState()
  // console.log(data)
  useEffect(() => {
    const GetMemes  = async() => {
      const resq = await axios.get('http://127.0.0.1:4000/api/memes/trend')
      setData(resq.data.data)
      // const tim = time(resq.data.data.createdAt)
    }
    GetMemes();
  },[])



  const [dotopen, setDotopen] = useState([])


  const OpenDot = (index) => {
    // console.log(index)
    setDotopen((prevOpen) => {
      const updatedOpen = [...prevOpen];
      updatedOpen[index] = !updatedOpen[index];
      return updatedOpen;
    });
  }
  function ext( url ) {
    return url.split(/[#?]/)[0].split('.').pop().trim();
  }
  const DownloadMeme = (url) => {
    console.log(url)
    if(ext(url) === "mp4" || ext(url) === "mkv" || ext(url === "ext")){
      saveAs(url, 'memes.mp4')
      setDotopen(false)
    }else{
      saveAs(url, 'memes.png')
      setDotopen(false)
    }
  }

  return (
    <>
    <Search/>
    <div className="Memes">
      {
        data ? data.map((dat, i) => {
          const {title, user, pic, file, createdAt, _id} = dat
          return(
            <div className="post" key={i}>
              <div className="title_part">
                <div className="first_part">
                  <img className='prof' src={pic} alt="profile" />
                  <div className="name">
                    <h1>{user}</h1>
                    <p>{time(createdAt)}</p>
                  </div>
                </div>
                <div className="icons" >
                  <BsThreeDotsVertical className='dots' size={30} onClick={() => OpenDot(i)}/>
                  {dotopen[i] && (
                      <div className="dotbutton">
                        <button onClick={() => DownloadMeme(file.url)}>Download</button>
                        <button>Report</button>
                      </div>
                    )}
                </div>
              </div>
              <div className="meme_title">
                <h1>{title}</h1>
              </div>
              <div className="main_memes">
                <NavLink to={`/post/${_id}`}>
                {
                    
                    ext(file.url) === 'mp4' || ext(file.url) === 'mkv' ? (
                  <ReactPlayer url={file.url} controls className="video" width="100%" height="100%"/>
                    ) : (
                      <img src={file.url} alt="memes" />
                    )
                  }
                </NavLink>
              </div>
            </div>
          )
        }): <img className='load' src={loading} alt='loading' />
      }
    </div>
    </>
  )
}

export default Tren