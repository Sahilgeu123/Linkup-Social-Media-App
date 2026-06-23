"use client";

import React, { useEffect, useState } from "react";
import PostInput from "./PostInput";
import Post from "./Post";
import {
  QueryDocumentSnapshot,
  DocumentData,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useDispatch } from "react-redux";
import { closeLoadingScreen } from "@/redux/Slices/loadingSlice";

const PostFeed = () => {
  const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs);
      dispatch(closeLoadingScreen());
    });
  }, []);



  return (
    <div className="flex-grow justify-center max-w-2xl min-w-[440px]">
      <div
        className="pt-4 pb-3 px-5 md:pt-5 md:pb-4 md:px-5 text-lg sm:text-xl md:text-2xl sticky top-0 
        z-50 bg-white bg-opacity-80 backdrop-blur-sm font-bold border-b-2 border-gray-300"
      >
        Home
      </div>
      <PostInput placeholder="What's happening..." insideModal={false} />
      {posts.map((post) => (
        <Post data={post.data()} id={post.id} />
      ))}
    </div>
  );
};

export default PostFeed;
