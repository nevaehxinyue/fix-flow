'use client'
import { Button } from '@radix-ui/themes'
import { signIn } from 'next-auth/react'


const GoogleSignin = () => {
  return (
    <Button  className="w-full "  mt="2" size="3" onClick={()=> signIn('google', {callbackUrl:'/'})}>
      Continue with Google
    </Button>

  )
}

export default GoogleSignin
