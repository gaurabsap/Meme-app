import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import time from '../Time'
const Post = () => {
    const {id} = useParams()
    const [data, setData] = useState()
    console.log(data)
    useEffect(() => {
        const GetData = async() => {
            const resq = await axios.get(`https://meme-api-26tc.onrender.com/api/post/${id}`)
            console.log(resq)
            setData([resq.data.data])
        }
        GetData()
    },[])
  return (
    <>
    <div className="post_data">
        {
            data ? data.map((dat, i) => {
                const {file, user, pic, title, createdAt} = dat
                return(
                    <div className="post" key={i}>
                        <div className="first">
                            <img src={file.url} alt="" />
                        </div>
                        <div className="others">
                            <div className="pic">
                                <img src={pic} alt="pic" />
                            </div>
                            <div className="user">
                                <h1>{user}</h1>
                                <p>{time(createdAt)}</p>
                            </div>
                        </div>
                    </div>
                )
            }): <h1>Loading</h1>
        }
    </div>
    </>
  )
}

export default Post
