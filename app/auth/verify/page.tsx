import { Box, Card, Container } from '@radix-ui/themes'
import React from 'react'

const EmailProviderVerifyPage = () => {
    
  return (
    <Box className="flex justify-center items-center h-screen bg-white">
    <Card className="p-8 bg-white rounded-lg shadow-lg max-w-sm w-full mx-auto text-center">
      <h1 className="text-xl font-bold mb-4">Check your email</h1>
      <p className="mb-6">A sign in link has been sent to your email address.</p>
      <code className="text-sm text-gray-500">{process.env.NEXTAUTH_URL}</code>
    </Card>
    </Box>
  
  )
}

export default  EmailProviderVerifyPage
