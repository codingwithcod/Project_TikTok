import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { RiSendPlaneFill } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";

import useAuthStore from "../store/authStore";
import NoResults from "./NoResults";
import { IUser } from "../types";
import { BiLoader } from "react-icons/bi";

interface Iprops {
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  isPostingComment: boolean;
  comments: Icomment[];
}

interface Icomment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref: string; _id: string };
}

// ==================================

const Comments = ({
  comment,
  comments,
  setComment,
  isPostingComment,
  addComment,
}: Iprops) => {


  const [showComment, setShowComment] = useState(false)


  const { userProfile, allUsers } = useAuthStore();

  return (
    <div className="border-t border-gray-200 pt-1 sm:pt-4   mt-1 sm:mt-4   ">

    {userProfile && (
            <div>
              <form className="flex  " onSubmit={addComment}>
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a Comment..."
                  className="bg-primary px-6 py-4 text-md font-medium border w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border focus:border-gray-300 flex-1 rounded-lg"
                />
                <button onClick={addComment} className="text-3xl text-gray-800 font-bold hover:bg-gray-100 px-3 ">
                  {isPostingComment ? <BiLoader className="animate-spin delay-1000"/> : <RiSendPlaneFill/>}
                </button>
              </form>
            </div>
          )}

          <div 
          onClick={() => setShowComment((prev) => !prev) }
          className="p-2 text-md font-semibold flex gap-2 items-center cursor-pointer">
            Show Comments <MdKeyboardArrowDown className={`text-2xl duration-300 ${showComment && 'rotate-180'}  `}/>
          </div>

          {
            showComment && (

              <div className="overflow-scroll mt-1 h-auto lg:h-[300px]">
              {comments?.length ? (
                comments.map((item, idx) => (
                  <div key={idx}>
                    {allUsers.map(
                      (user: IUser, idx) =>
                        user._id === (item.postedBy._id || item.postedBy._ref) && (
                          <div key={idx} className="p-2 items-center">
                            <Link href={`/profile/${user._id}`}>
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8">
                                  <Image
                                    src={user.image}
                                    width={34}
                                    height={34}
                                    alt="user Profile"
                                    className="rounded-full"
                                  />
                                </div>
                                <div className="hidden xl:block">
                                  <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                                    {user.userName.replaceAll(" ", "")}
                                    <GoVerified className="text-blue-400" />
                                  </p>
                                  <p className="capitalize text-gray-400 text-xs">
                                    {user.userName}
                                  </p>
                                </div>
                              </div>
                            </Link>
                            <div>
                              <p>~{item.comment}</p>
                            </div>
                          </div>
                        )
                    )}
                  </div>
                ))
              ) : (
                <NoResults text="No comments yet!" />
              )}
            </div>
            )
          }


   


    
    </div>
  );
};

export default Comments;
