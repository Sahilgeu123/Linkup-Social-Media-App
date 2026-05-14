"use client";
import {
  CalendarIcon,
  ChartBarIcon,
  FaceSmileIcon,
  MapPinIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import Image from "next/image";
import { RootState } from "@/redux/store";
import { db } from "@/firebase";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeCommentModel, openLogInModel } from "@/redux/Slices/modalSlice";

interface PostInputProps1 {
  here:string;
}

type PostInputProps = {
  placeholder: string;
  insideModal: boolean;
};

const PostInput: React.FC<PostInputProps> = ({ placeholder, insideModal }) => {
  const [text, settext] = useState("");

  const user = useSelector((state: RootState) => state.user);
  const commentDetails = useSelector(
    (state: RootState) => state.modals.commentPostDetails,
  );
  const dispatch = useDispatch();
  console.log(user.name);

  async function sendPost() {

    if(!user.username){
      dispatch(closeCommentModel());
      dispatch(openLogInModel());
      return;
    }
    await addDoc(collection(db, "posts"), {
      text: text,
      name: user.name,
      username: user.username,
      timestamp: serverTimestamp(),
      likes: [],
      comments: [],
    });
    settext("");
  }

  async function sendComment() {
    if (!commentDetails?.id) {
      console.error("No post ID provided for comment");
      return;
    }
    const postRef = doc(db, "posts", commentDetails.id);
    const commentsRef = collection(postRef, "comments");
    await addDoc(commentsRef, {
      name: user.name,
      username: user.username,
      text: text,
      timestamp: serverTimestamp(), // ✅ works here
    });

    settext("");
    dispatch(closeCommentModel());
  }

  return (
    <div className="flex  gap-4 mb-4  border-t-2 border-b-2 border-gray-300 pb-4">
      <div className=" mt-4 ">
        <Image
          className="ms-[2px]  md:mx-5 md:ml-[-3px]  z-10 "
          src={insideModal ? "/assets/user.png" : "/assets/logo1.png"}
          width={80}
          height={80}
          alt={"logo"}
        />
      </div>
      <div className="w-full mr-4 mt-6">
        <textarea
          placeholder={placeholder}
          className="w-full min-h-[50px] 
          border-gray-300 rounded-lg p-2   
          focus:outline-none resize-none focus:ring-2 focus:ring-gray-500"
          onChange={(e) => settext(e.target.value)}
          value={text}
        />

        <div className="flex justify-between pt-5">
          <div className="flex gap-3 mt-1 ">
            <PhotoIcon className="w-[22px] h-[22px] cursor-pointer hover:text-gray-500" />
            <ChartBarIcon className="w-[22px] h-[22px] cursor-pointer hover:text-gray-500" />
            <FaceSmileIcon className="w-[22px] h-[22px] cursor-pointer hover:text-gray-500" />
            <CalendarIcon className="w-[22px] h-[22px] cursor-pointer hover:text-gray-500" />
            <MapPinIcon className="w-[22px] h-[22px] cursor-pointer hover:text-gray-500" />
          </div>
          <button
            className="px-4 py-1 rounded-xl border-y-2 hover:border-2 transition-border border-gray-300
           hover:border-gray-500 transition-colors 
           duration-600 disabled:bg-opacity-60 font-bold hover:bg-gray-100"
            onClick={() => (insideModal ? sendComment() : sendPost())}
            disabled={!text}
          >
            Post it, bro!
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostInput;
