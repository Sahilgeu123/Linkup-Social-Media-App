"use client";
import React from "react";
import Sidebar from "../Components/Sidebar";
import Widget from "../Components/Widget";
import SignUpPrompt from "../Components/SignUpPrompt";
import {
  ArrowLeftIcon,
  ArrowUpTrayIcon,
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { PostHeader } from "../Components/Post";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";

const fetchPost = async (id: string) => {
  const postRef = doc(db, "posts", id);
  const postSnap = await getDoc(postRef);

console.log("ID used:", id);

if (postSnap.exists()) {
  console.log("Document data:", postSnap.data());
  return postSnap.data();
} else {
  console.log("No such document!");
  return null;
}
};

interface PostProps {
  params: {
    id: string;
  };
}

interface Comment{
    name:string;
    text:string;
    username:string;
}

async function page({ params }: PostProps) {
  const { id } = params;
  const post = await fetchPost(id);

  return (
    <div>
      <div className="flex text-[#0F1419] min-h-screen max-w-[1400px] mx-auto max-h-screen">
        <Sidebar />

        <div className="flex-grow justify-center max-w-2xl min-w-[440px]">
          <div className="pt-4 pb-3 px-5 sticky top-0 z-50 bg-white bg-opacity-80 backdrop-blur-sm font-bold border-b-2 border-gray-300 flex gap-5 items-center">
            <Link href={"/"}>
              <ArrowLeftIcon className="w-5 h-5" />
            </Link>
            LinkUp
          </div>

          <div>
            <div className="flex justify-between p-3 border-b-2 border-gray-100">
              <div className="flex gap-3 items-center">
                <Image
                  src={"/assets/user.png"}
                  width={65}
                  height={65}
                  alt="Profile"
                />
                <div className="flex flex-col whitespace-nowrap overflow-hidden text-ellipsis mr-1 max-w-[60px] min-[400px]:max-w-[100px] min-[500px]:max-w-[1400px] sm:max-[160px]">
                  <span className="font-bold">{post?.name ?? "Unknown"}</span>
                  <span>{post?.username ?? ""}</span>
                </div>
              </div>
              <EllipsisHorizontalIcon className="h-5 w-5 cursor-pointer" />
            </div>
            <span>{post?.text ?? "No post found"}</span>
          </div>

          <div className="border-b-2 border-gray-100 text-[15px]">
            <span className="font-bold">{post?.likes?.length ?? 0} Likes</span>
          </div>

          <div className="border-b-2 p-3 border-gray-100 text-[15px] flex justify-evenly">
            <ChatBubbleOvalLeftEllipsisIcon className="w-[22px] h-[22px] text-[#707E89] cursor-not-allowed" />
            <HeartIcon className="w-[22px] h-[22px] text-[#707E89] cursor-not-allowed" />
            <ChartBarIcon className="w-[22px] h-[22px] text-[#707E89] cursor-not-allowed" />
            <ArrowUpTrayIcon className="w-[22px] h-[22px] text-[#707E89] cursor-not-allowed" />
          </div>
          {
            post?.comments.map((comment:Comment)=>(
              <Comment name={comment.name} 
              username={comment.username} 
              text={comment.text} />
            ))
          }
          
        </div>
        <Widget />
      </div>
      
      <SignUpPrompt />
    </div>
  );
}
interface CommentProps{
  name:string,
  username:string,
  text:string
}

function Comment({name,username,text}:CommentProps) {
  return (
    <div className="border-b border-gray-100">
      <PostHeader name={name} username={username} text={text} />
      <div className="flex space-x-14 p-3 ms-16">
        <ChatBubbleOvalLeftEllipsisIcon className="w-[22px] h-[22px] cursor-not-allowed" />
        <HeartIcon className="w-[22px] h-[22px] cursor-not-allowed" />
        <ChartBarIcon className="w-[22px] h-[22px] cursor-not-allowed" />
        <ArrowUpTrayIcon className="w-[22px] h-[22px] cursor-not-allowed" />
      </div>
    </div>
  );
}

export default page;