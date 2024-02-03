import React from 'react'
import RegisterForm from './RegisterForm'
import { Card, Flex, Heading } from '@radix-ui/themes'
import { SiGhost } from 'react-icons/si'

const RegisterPage = () => {
  return (
    <div>
    <Flex direction="column"  align="center"  gap="3" mt="9" mb="6">
    <SiGhost size="50" />
     </Flex>
     <Flex direction="column" gap="3"  align="center" justify="center" mt="9">
    <Heading mt="6">Create your account </Heading>

    <Card size="5" mt="5" >      
    
        <RegisterForm />
     </Card>
      
    </Flex>
     
    </div>
  )
}

export default RegisterPage
