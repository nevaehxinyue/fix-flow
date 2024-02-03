'use client'
import { ErrorMessage } from '@/app/components';
import { userProfileUpdateSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, Flex, TextField, TextFieldInput } from '@radix-ui/themes';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { PiUser } from 'react-icons/pi';
import { z } from 'zod';

type usernameFormData = z.infer<typeof userProfileUpdateSchema>;

const UsernameForm = () => {
    const [error, setError] = useState("");
    const {data: session }= useSession();
    if (!session?.user) {
        throw new Error ('User account not found')
    }
    console.log(session)
    
    const { register, handleSubmit, formState: { errors, isSubmitting, isValid }} = useForm<usernameFormData>({
        resolver: zodResolver(userProfileUpdateSchema),
        
    })

    const onSubmit = async (data: usernameFormData) => {
        try{
            const response = await axios.patch('/api/users/'+ session.user.id, data)
            if(response.data.success) {
              toast.success("Your username has been updated successfully! You'll be redirected the dashboard in seconds.")
            }
        }catch(error){
            setError("Something went wrong. Username cannot be saved.")
        }
    }
  return (<Flex direction="column">
  <form className="space-y-3 mb-3" onSubmit={handleSubmit(onSubmit)}>

    <div className="space-y-1">
      <label>Username</label>
      <TextField.Root>
      <TextField.Slot>
          <PiUser />
        </TextField.Slot>
        <TextFieldInput
          required
          size="3"
          {...register("name")}
        
        />
      </TextField.Root>
    </div>
    <ErrorMessage>{errors.name?.message}</ErrorMessage>

    <Button
      className="w-full "
      size="3"
      type="submit"
      disabled={isSubmitting || !isValid}
    >
     Save
    </Button>
    <Toaster />
  </form>
{error && (
  <Callout.Root color="red">
    <Callout.Text>{error}</Callout.Text>
  </Callout.Root>
)}
</Flex>
)
}


export default UsernameForm
