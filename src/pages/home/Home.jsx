import React, { useEffect, useState } from "react";
import Search from "../../search/Search";
import axios from "axios";
import time from "../Time";
import { BsThreeDotsVertical, BsDownload, BsHeart } from "react-icons/bs";
import { AiFillHeart, AiFillDislike } from "react-icons/ai";
import { GoHeart } from "react-icons/go";

import "./home.scss";
import loading from "../../assets/loading.gif";
import { NavLink } from "react-router-dom";
import { saveAs } from "file-saver";
import ReactPlayer from "react-player";

const Home = () => {
  const [data, setData] = useState();

  // console.log(data)
  useEffect(() => {
    const GetMemes = async () => {
      const resq = await axios.get("http://127.0.0.1:4000/api/memes/data");
      setData(resq.data.data);
      // console.log(resq.data.data[0].file.url)
      // console.log(resq)
    };
    GetMemes();
  }, []);

  const [dotopen, setDotopen] = useState([]);

  const OpenDot = (index) => {
    // console.log(index)
    setDotopen((prevOpen) => {
      const updatedOpen = [...prevOpen];
      updatedOpen[index] = !updatedOpen[index];
      return updatedOpen;
    });
  };
  function ext(url) {
    return url.split(/[#?]/)[0].split(".").pop().trim();
  }
  const DownloadMeme = (url) => {
    console.log(url);
    const fileExtension = ext(url);
    if (fileExtension === "mp4" || fileExtension === "mkv") {
      saveAs(url, "memes.mp4");
    } else if (fileExtension === "png" || fileExtension === "jpg") {
      saveAs(url, "memes.png");
    }
    setDotopen(false);
  };

  const [likecolor, setLikeColor] = useState(false);
  const [dilikecolor, setDislikeColor] = useState(false);

  const [likenum, setLikeNum] = useState(0);
  const [dislikenum, setDisLikeNum] = useState(0);
  console.log("like : " + likenum);
  console.log("dislike : " + dislikenum);

  useEffect(() => {
    const Api = async () => {
      const url = `http://127.0.0.1/api/${
        likenum ? "like" : dislikenum ? "dislike" : null
      }/4000`;
      console.log(url);
      // const resq = await axios.put(`http://127.0.0.1/api/${likenum ? like : dislike}`)
      // console.log()
    };
    Api();
  }, [likenum, dislikenum]);

  const LikeChange = (like) => {
    if (dilikecolor) {
      setDislikeColor(false);
      setDisLikeNum((prev) => prev - 1);
    }
    setLikeColor(!likecolor);
    setLikeNum(like + 1);

    if (likecolor) {
      setLikeNum(like - 1);
      setLikeColor(false);
    }
  };

  const Dislike_event = (dislike) => {
    if (likecolor) {
      setLikeColor(false);
      setDisLikeNum(dislike + 1);
      setLikeNum((pre) => pre - 1);
    }
    setDislikeColor(!dilikecolor);
    setDisLikeNum(dislike + 1);

    if (dilikecolor) {
      setDisLikeNum(dislike - 1);
    }
  };

  return (
    <>
      <Search />
      <div className="Memes">
        {data ? (
          data.map((dat, i) => {
            const { title, user, pic, file, createdAt, _id, like, dislike } =
              dat;
            return (
              <div className="post" key={i}>
                <div className="title_part">
                  <div className="first_part">
                    <img className="prof" src={pic} alt="profile" />
                    <div className="name">
                      <h1>{user}</h1>
                      <p>{time(createdAt)}</p>
                    </div>
                  </div>
                  <div className="icons">
                    <BsThreeDotsVertical
                      className="dots"
                      size={30}
                      onClick={() => OpenDot(i)}
                    />
                    {dotopen[i] && (
                      <div className="dotbutton">
                        <button onClick={() => DownloadMeme(file.url)}>
                          Download
                        </button>
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
                    {ext(file.url) === "mp4" || ext(file.url) === "mkv" ? (
                      <ReactPlayer
                        url={file.url}
                        controls
                        loop
                        width="100%"
                        height="100%"
                        muted={true}
                        pip={true}
                        stopOnUnmount={false}
                      />
                    ) : (
                      <img src={file.url} alt="memes" />
                    )}
                  </NavLink>
                </div>
              </div>
            );
          })
        ) : (
          <img className="load" src={loading} alt="loading" />
        )}
      </div>
    </>
  );
};

export default Home;
