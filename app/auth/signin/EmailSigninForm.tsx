'use client'
import { ErrorMessage } from '@/app/components';
import { emailSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { EnvelopeClosedIcon } from '@radix-ui/react-icons'
import { Button, TextField, TextFieldInput } from '@radix-ui/themes'
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from "zod";


type EmailFormData = z.infer<typeof emailSchema>;

const EmailSigninForm= () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (data: EmailFormData) => {
    await signIn('email', { email: data.email, callbackUrl: '/'})
  }
  return (
    <form className="space-y-5 mb-3" onSubmit={handleSubmit(onSubmit)}>
    <div className="space-y-3 mt-3">
      <label>Email address</label>
      <TextField.Root>
        <TextField.Slot>
          <EnvelopeClosedIcon />
        </TextField.Slot>
        <TextFieldInput
          type="email"
          required
          size="3"
          placeholder="hello@example.com"
          {...register("email")}
        />
      </TextField.Root>
    </div>
    <ErrorMessage>{errors.email?.message}</ErrorMessage>
   <Button  type="submit" className="w-full " size="3" >
      Continue with email
    </Button>
    </form>
  )
}

export default EmailSigninForm