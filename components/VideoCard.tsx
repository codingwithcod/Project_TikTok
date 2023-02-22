import React, { useState, useEffect, useRef } from "react";
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { FaRegComment } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { toast, Toaster } from "react-hot-toast";

import { Video } from "@/types";
import LikeButton from "./LikeButton";
import useAuthStore from "@/store/authStore";
import axios from "axios";
import { BASE_URL } from "@/utils";
import Comments from "./Comments";



// =======================================================

interface IProps {
  postDetail: Video;
}



const VideoCard: NextPage<IProps> = ({ postDetail }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [post, setPost] = useState(postDetail);

  const [isHover, setIsHover] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [comment, setComment] = useState('')
  const [isPostingComment, setIsPostingComment] = useState(false)
  const {userProfile}:any = useAuthStore();


  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };

  useEffect(() =>{
    if(videoRef?.current){
      videoRef.current.muted = isVideoMuted
    }
  },[isVideoMuted])



  const handleLike = async(like:boolean) => {
    if(userProfile ){
      const {data} = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like
      })

      setPost({...post, likes:data.likes})
    }

  }


  const addComment = async (e) => {
    e.preventDefault();
    if(userProfile && comment) {
      setIsPostingComment(true)

      const {data} = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
          userId: userProfile._id,
          comment
      })

      setPost({...post, comments:data.comments})
      setComment('')
      setIsPostingComment(false)
    }
  }
  

  

  return (
    <div className="flex flex-col  border-gray-200  pb-1">
      <Toaster/>
      <div>
        <div className="flex gap-3 p-2 cursor-pointer items-center font-semibold rounded ">
          <div className="md:w-14 md:h-14 w-10 h-10 ">
            <Link href={`/profile/${post?.postedBy._id}`}>
              <>
                <Image
                  width={52}
                  height={52}
                  className="rounded-full"
                  src={post?.postedBy.image}
                  alt="profile"
                />
              </>
            </Link>
          </div>
          <div>
            <Link href={`/profile/${post?.postedBy._id}`}>
              <div className="flex items-center gap-2 ">
                <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                  {post?.postedBy.userName}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                  {post?.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className=" flex gap-4 relative  ">
        <div 
        onClick={onVideoClick}
        >
          <div>
            <video
              ref={videoRef}
              loop
              
              src={post.video.asset.url}
              className="lg:w-[600px] h-[500px] md:h-[400px] lg:h-[528px] w-[400px]  cursor-pointer bg-gray-100 object-cover"
            ></video>
          </div>
          <div className="absolute top-[45%] left-[40%]  cursor-pointer">
            {!isPlaying && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className="text-white drop-shadow-lg text-6xl lg:text-8xl" />
              </button>
            )}
          </div>
          </div>

          { (
            <div className="absolute bottom-6  cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] lg:w-[600px] p-3">
             
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className="text-white drop-shadow-lg text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className="text-white drop-shadow-lg text-2xl lg:text-4xl" />
                </button>
              )}
            </div>
          )}
      </div>


      <div className="lg:w-[600px] border-b-2">

        {/* ========== Catption =========== */}
        <div className='mt-1 px-5'>
          <p className=' text-lg font-semibold text-gray-600'># {post.caption}</p>
      </div>
        {/* ========== Like =========== */}
        <div className=" flex  justify-evenly items-center ">
            {userProfile ? (
              <LikeButton
              likes={post.likes}
              handleLike={() => handleLike(true)}
              handleDisLike={() => handleLike(false)}
              />
              ): (
                <div className="flex flex-col justify-center items-center mt-4">
              <div
              onClick={() => toast.error('Sign in First !')}
              className="rounded-full p-2 md:p-4 bg-primary">
              <MdFavorite className="text-lg md:text-2xl  "/>

              </div>
              <span className="text-md font-semibold">
               {post.likes.length | 0}
              </span>

              </div>
              )
              
              }
              <div className="flex flex-col justify-center items-center mt-4">
              <div
              className="rounded-full p-2 md:p-4 bg-primary">
              <FaRegComment className="text-lg md:text-2xl  "/>

              </div>
              <span className="text-md font-semibold">
               {post.comments.length | 0}
              </span>

              </div>
              
        </div>
         {/* ========== Comment =========== */}
        <Comments
          comment={comment}
          setComment={setComment}
          addComment={addComment}
          comments={post.comments}
          isPostingComment={isPostingComment}
        />

      </div>

    </div>
  );
};

export default VideoCard;
