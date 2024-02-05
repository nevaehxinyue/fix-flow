'use client'
import { Button } from '@radix-ui/themes'
import { signIn } from 'next-auth/react'
import { FaGoogle } from "react-icons/fa";


const GoogleSignin = () => {
  return (
    <Button className="w-full" size="3" onClick={()=> signIn('google', {callbackUrl:'/'})}>
      Continue with Google <FaGoogle />
    </Button>

  )
}

export default GoogleSignin
