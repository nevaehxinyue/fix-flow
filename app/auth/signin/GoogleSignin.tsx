'use client'
import { Flex } from '@radix-ui/themes'
import { signIn } from 'next-auth/react'
import { FaGoogle } from "react-icons/fa";


const GoogleSignin = () => {
  return (
    <button
    onClick={()=> signIn('google', {callbackUrl:'/'})}
    className="w-[15rem] sm:w-[18rem] h-[2.5rem] bg-button-color rounded-md hover:bg-button-hover-color font-semibold text-white text-xs p-2 justify-center "
    type="submit"
  >
    <Flex gap="2" justify="center" align="center">
    Continue with Google <FaGoogle />
    </Flex>
  </button>

  )
}

export default GoogleSignin
