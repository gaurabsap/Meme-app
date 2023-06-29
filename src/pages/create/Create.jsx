import React, { useRef, useState } from 'react';
import './create.scss';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import loading from '../../assets/lod.gif'
import ReactPlayer from 'react-player'
const Create = () => {

  const [load,setLoad] = useState(false)

    const navigate= useNavigate()
    const [title, setTitle] = useState()
    const inputRef = useRef(null);


    const [previewpost, setPreviewPost] = useState(null);

    const [error, setError] = useState()
    const [image, setImage] = useState()
    const [imageprev, setImagePrev] = useState(false)
    const [video, setVideo] = useState()
    console.log(video)
    // console.log(video)
    const [videoprev, setVideoPrev] = useState()

    const handlePostChange = (e) => {
      const file = inputRef.current.files[0];

      const fileSizeLimit = 20 * 1024 * 1024; // 10MB
      if (file && file.size > fileSizeLimit) {
        setError('File size must be less than 20.');
        setTimeout(() => {
          setError('')
        }, 3000);
      } else {
        setError('');
 
        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            if(file.type.startsWith('video/')){
              setVideoPrev(true)
              setImagePrev(false)
              setVideo(reader.result)
              setFile(reader.result)
            }else{
              setVideoPrev(false)
              setImagePrev(true)
              setImage(reader.result)
              setFile(reader.result)
            }
            // setPreviewPost(reader.result);
            // setImage(reader.result);
          };
        } else {
          setVideo(null)
          setPreviewPost(null);
          setImage(null);
        }
      }




      
    };
    
  const [file, setFile] = useState(null)
  console.log(file)
//   console.log(data)
  const PostMemes = async (e) => {
    e.preventDefault()
    // if(imageprev === true){
    //   setFile(image)
    // }else{
    //   setFile(video)
    // }
    const data = {
        title, file
    }
    try {
      setLoad(true)
        const resq = await axios.post('https://meme-api-26tc.onrender.com/api/create', data, { withCredentials: true })
        // console.log(resq)
        if(resq.status == 200){
          navigate('/')
          location.reload()
        }
    } catch (error) {
      setLoad(false)
        console.log(error)
        setError(error.message)
        setTimeout(() => {
          setError('')
        }, 3000);
    }
  }
  
  return (
    <>
      <div className="create">
        <div className="heading">
          <h1>Create</h1>
          <p>Post your funniest memes here</p>
        </div>
        <form className="post_memes" encType='multipart/form-data'>
          <div className="title">
            {/* <label htmlFor="label">Username</label> */}
            <input type="text" placeholder="Title here..." name="title" onChange={(e) => setTitle(e.target.value)}/>
          </div>
          <div className="upload">
            <label htmlFor="upload">Upload file</label>
            <input ref={inputRef} id="upload" type="file" onChange={handlePostChange}  accept='.mp4, .mkv, .ext, .png, .jpg, .svg, .jpeg '/>
            <div className="previews">
              {imageprev ? <img src={image} alt="Preview" className='imgdata' /> : videoprev ? (
                <ReactPlayer url={video} controls className="video" width="100%" height="100%"/>
              ) : <h1 className="preview">Preview here..</h1>}
            </div>
          </div>
          <center>
            <h2 style={{color: 'red'}}>{error}</h2>
          </center>
          <button onClick={PostMemes}>
            {
              load ? (<img className='load' src={loading} alt="" />) : "Post"
            }
          </button>
        </form>
      </div>
    </>
  );
};

export default Create;
