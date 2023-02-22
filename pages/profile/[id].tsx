import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import { googleLogout } from '@react-oauth/google'

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";
import { FiSettings } from "react-icons/fi";
import useAuthStore from "@/store/authStore";



interface Iprops {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile = ({ data }: Iprops) => {


  const [showUserVideos, setShowUserVideos] = useState(true)
  const [videosList, setVideosList] = useState<Video[]>([])

  const { user, userVideos, userLikedVideos } = data;
  const { removeUser, userProfile} = useAuthStore();
  const userId =  userProfile?._id;

 

  const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'
  const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'


  useEffect(() => {
    if(showUserVideos){
      setVideosList(userVideos)
    }else{
      setVideosList(userLikedVideos)
    }
  },[showUserVideos, userVideos, userLikedVideos])

  return (
    <div className="w-full">
      <div className="flex justify-between mb-4  items-center w-full">
        <div className="flex gap-6 md:gap-10 ">
          <div className="w-16 h-16 md:w-32 md:h-32">
            <Image
              src={user.image}
              width={120}
              height={120}
              alt="user Profile"
              className="rounded-full"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-md md:text-2xl font-bold tracking-wider flex gap-2 items-center justify-center lowercase">
              {user.userName.replaceAll(" ", "")}
              <GoVerified className="text-blue-400" />
            </p>
            <p className="capitalize text-gray-400 md:text-xl text-xs">{user.userName}</p>
          </div>
        </div>

        { (user._id === userId && userProfile) ?
          <div className="flex group relative  mr-5">
          <FiSettings className="text-3xl  cursor-pointer hover:rotate-45 z-50"/>
          <div className="absolute hidden group-hover:flex  -top-1 shadow-xl right-0 flex-col divide-y divide-black justify-center items-center w-36 bg-gray-100  border p-3 pt-0 rounded-lg">
            <span className="p-2 text-gray-400">Settings</span>
            <span className="p-2 cursor-not-allowed">Edit</span>
            <span 
              onClick={() => {
              googleLogout();
                removeUser() }}
            className="p-2 cursor-pointer font-semibold text-lg text-red-400 hover:text-red-600 hover:font-bold">Logout</span>
          </div>
        </div> : ''
  }
       
      </div>

      <div>
        <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
          <p className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`} 
          onClick={() => setShowUserVideos(true)}
          >Videos</p>
          <p className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`} 
          onClick={() => setShowUserVideos(false)}
          >Liked</p>
        </div>

        <div className='flex gap-6 flex-wrap md:justify-start'>
          {videosList.length > 0 ? (
            videosList.map((post:Video, idx:number) => (
              <VideoCard key={idx} postDetail={post} />
            ))
          ): (
            <NoResults text={`No ${showUserVideos ? '': 'Liked'} Videos yet !`} />
          )}

        </div>
      </div>

    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const response = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: {
      data: response.data,
    },
  };
};

export default Profile;
