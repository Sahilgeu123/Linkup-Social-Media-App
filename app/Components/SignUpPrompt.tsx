"use client"
import React from 'react'
import SignupModal from './modals/SignupModal'
import LogInModal from './modals/LogInModal'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

const SignUpPrompt = () => {
  const username =useSelector((state:RootState)=>state.user.username)
  
  return (
    !username && (
    <div className='fixed w-full h-[80px] bg-gray-300 bg-opacity-80 z-20
      backdrop-blur-sm  bottom-0 left-0 flex justify-center items-center px-4 space-x-10'>
      <div className='flex flex-col'>
        <span className='mr-[-30px] md:mr-[0px] font-semibold'>Sign up to see what's happening!</span>
        <span className='hidden xl:flex'>
          Join LinkUp today and connect with people, ideas, and opportunities that matter.</span>
      </div>
      <div className=' flex space-x-2 '> 
        <LogInModal/>
        <SignupModal/>
      </div>
    </div>
  ))
}

export default SignUpPrompt