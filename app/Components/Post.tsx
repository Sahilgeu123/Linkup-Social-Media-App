import React from "react";
import Image from "next/image";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowUpTrayIcon,
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import {
  arrayRemove,
  arrayUnion,
  doc,
  DocumentData,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { setCommentDetails, openCommentModal, openLogInModel } from "@/redux/Slices/modalSlice";
import Link from "next/link";
import { RootState } from "@/redux/store";
import { db } from "@/firebase";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
interface postprops {
  data: DocumentData;
  id: string;
}

const Post = ({ data, id }: postprops) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  async function likePost() {

    if(!user.username){
      dispatch(openLogInModel());
      return;
    }


    const postRef = doc(db, "posts", id);
    if (data.likes?.includes(user.uid)) {
      await updateDoc(postRef, {
        likes: arrayRemove(user.uid),
      });
    } else {
      await updateDoc(postRef, {
        likes: arrayUnion(user.uid),
      });
    }
  }
  return (
    <div className="border-b-2  border-gray-100">
      <Link href={"/" + id}>
        <PostHeader
          username={data.username}
          name={data.name}
          timestamp={data.timestamp}
          text={data.text}
        />
      </Link>
      <div className="ml-16 p-3 flex gap-10">
        <div className=" flex gap-1 items-center">
          <ChatBubbleOvalLeftEllipsisIcon
            className="w-[22px] h-[22px] 
          cursor-pointer hover:text-gray-500 transition"
            onClick={() => {

              if(!user.username){
                dispatch(openLogInModel());
                return;
              }


              dispatch(
                setCommentDetails({
                  name: data.name,
                  username: data.username,
                  id: id,
                  text: data.text,
                }),
              );
              dispatch(openCommentModal());
            }}
          />
          {data.comments?.length > 0 && (
            <span className="text-[10px] ">{data.comments?.length || 0}</span>
          )}
        </div>
        <div className=" flex gap-1 items-center">
          {data.likes?.includes(user.uid) ? (
            <HeartSolidIcon
              className="w-[22px] h-[22px] cursor-pointer text-red-600 transition"
              onClick={() => likePost()}
            />
          ) : (
            <HeartIcon
              className="w-[22px] h-[22px] cursor-pointer hover:text-pink-500 transition"
              onClick={() => likePost()}
            />
          )}
          <span className="text-[10px] ">{data.likes?.length || 0}</span>
        </div>
        <div className=" flex gap-1 items-center">
          <ChartBarIcon className="w-[22px] h-[22px]" />
        </div>
        <div className=" flex gap-1 items-center">
          <ArrowUpTrayIcon className="w-[22px] h-[22px] " />
        </div>
      </div>
    </div>
  );
};

interface PostHeaderProps {
  username: string;
  name: string;
  timestamp?: Timestamp;
  text: string;
  replyTo?: string;
}

export const PostHeader: React.FC<PostHeaderProps> = ({
  username,
  name,
  timestamp,
  text,
  replyTo,
}) => {
  return (
    <div className="flex gap-3 p-1">
      <Image
        className="w-20 rounded-full z-10 ml-[-3px]"
        src="/assets/user.png"
        alt="User avatar"
        width={60}
        height={60}
      />

      <div className="w-full text-[15px] flex flex-col justify-center ">
        <div className="text-[#707E89] flex">
          <span
            className="font-bold text-[#0F1419] inline-block 
           whitespace-nowrap overflow-hidden text-ellipsis mr-1 
           max-w-[60px] min-[400px]:max-w-[100px] min-[500px]:max-w-[1400px] sm:max-[160px]"
          >
            {name}
          </span>

          <span
            className="whitespace-nowrap inline-block 
            overflow-hidden text-ellipsis
          max-w-[60px] min-[400px]:max-w-[100px] 
          min-[500px]:max-w-[140px] sm:max-[160px] ml-1"
          >
            @{username}
          </span>
          <div className="">
            {timestamp && (
              <>
                <span className="ml-2 mr-1"> .</span>
                <Moment fromNow>{timestamp.toDate()}</Moment>
              </>
            )}
          </div>
        </div>
        <span className="">{text}</span>
        {replyTo && (
          <span className="text-[15px] text-[#707E89]">
            Replying to <span className="">@{replyTo}</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default Post;
