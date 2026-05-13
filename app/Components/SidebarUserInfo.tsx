"use client";

import React from "react";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useDispatch, useSelector } from "react-redux";
import { signoutUser } from "@/redux/Slices/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { div } from "@tensorflow/tfjs";

const SidebarUserInfo = () => {
  const dispatch: AppDispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  async function handleSignOut() {
    await signOut(auth);
    dispatch(signoutUser());
  }

  return (
    <div
      className=" flex justify-start items-center space-x-1 absolute 
            bottom-0 left-0 right-0 p-0 xl:pr-9 ml-4 xl:ml-[-4px] mb-3  w-14 h-14 
            xl:min-w-[175px]  xl:h-[60px] group 
            border-y rounded-full  border-gray-300 cursor-pointer
            hover:bg-gray-200 hover:border-gray-500 transition duration-300"
      onClick={() => {
        handleSignOut();
      }}
    >
      <Image
        className="xl:ml-2 ml-[3px]  rounded-full  "
        src="/assets/user.png"
        width={50}
        height={50}
        alt="User"
      />

      {/* Info div */}
      <div
        className="flex-col hidden group-hover:flex 
        absolute left-14 top-1 xl:group-hover:hidden
      bg-white shadow-md rounded-md px-5 py-1 min-w-36 z-30"
      >
        <span className="font-semibold whitespace-nowrap text-ellipsis overflow-hidden ">{user.name}</span>
        <span className="text-[9px] text-gray-500 whitespace-nowrap text-ellipsis overflow-hidden">{user.username}</span>
      </div>

      <div className="flex-col hidden xl:flex sm:hover:flex min-w-20">
        <span className="font-semibold whitespace-nowrap text-ellipsis overflow-hidden">{user.name}</span>
        <span className="text-[9px] text-gray-500 whitespace-nowrap text-ellipsis overflow-hidden">{user.username}</span>
      </div>
    </div>
  );
};

export default SidebarUserInfo;
