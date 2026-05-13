import {
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

const Widget = () => {
  return (
    <div className="w-[300px] xl:ml-8 mt-4 px-2 md:flex flex-col space-y-4 hidden">
      <div className="flex rounded-xl bg-[#EFF3F4] text-[#89959D] h-[44px] item-center space-x-2">
        <MagnifyingGlassIcon className="w-7 h-9 pb-1 mt-1 ml-2" />
        
        <input placeholder="Search" className="bg-transparent w-full pr-3 focus:outline-none" />
      </div>
      <div className="">
        <div className="bg-[#EFF3F4] rounded-xl px-3 py-6">
          <h1 className="text-xl font-bold ">What's Happening?</h1>
          <div className="flex flex-col py-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Trending in Australia</span>
              <EllipsisHorizontalIcon className="w-7 cursor-pointer " />
            </div>
            <span className="font-bold text-[16px]">#ReactJS</span>
            <span className="text-gray-500">200k LinkUp </span>
          </div>
          <div className="flex flex-col py-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Trending in Australia</span>
              <EllipsisHorizontalIcon className="w-7 cursor-pointer" />
            </div>
            <span className="font-bold text-[16px]">#ReactJS</span>
            <span className="text-gray-500">200k LinkUp </span>
          </div>
          <div className="flex flex-col py-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Trending in Australia</span>
              <EllipsisHorizontalIcon className="w-7 cursor-pointer" />
            </div>
            <span className="font-bold text-[16px]">#ReactJS</span>
            <span className="text-gray-500">200k LinkUp </span>
          </div>
          <div className="flex flex-col py-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Trending in Australia</span>
              <EllipsisHorizontalIcon className="w-7 cursor-pointer" />
            </div>
            <span className="font-bold text-[16px]">#ReactJS</span>
            <span className="text-gray-500">200k LinkUp </span>
          </div>
        </div>
      </div>
      <div className="bg-[#EFF3F4] rounded-xl px-3 pt-6">
        <h1 className="text-xl font-bold mb-4 ">Who to Follow</h1>
        <div className="flex items-center mb-4">
          <Image
            className="rounded-full"
            src="/assets/image.png"
            alt="User"
            width={50}
            height={50}
          />
          <div className="flex w-full justify-between items-center ml-3">
            <div className="flex flex-col">
              <span className="font-bold">John Doe</span>
              <span className="text-gray-500">@johndoe</span>
            </div>
            <button className="bg-black text-white rounded-full px-4 py-2 ml-2">
              Follow
            </button>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <Image
            className="rounded-full"
            src="/assets/image.png"
            alt="User"
            width={50}
            height={50}
          />
          <div className="flex w-full justify-between items-center ml-3">
            <div className="flex flex-col">
              <span className="font-bold">John Doe</span>
              <span className="text-gray-500">@johndoe</span>
            </div>
            <button className="bg-black text-white rounded-full px-4 py-2 ml-2">
              Follow
            </button>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <Image
            className="rounded-full"
            src="/assets/image.png"
            alt="User"
            width={50}
            height={50}
          />
          <div className="flex w-full justify-between items-center ml-3">
            <div className="flex flex-col">
              <span className="font-bold">John Doe</span>
              <span className="text-gray-500">@johndoe</span>
            </div>
            <button className="bg-black text-white rounded-full px-4 py-2 ml-2">
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
