'use client';
import { ErrorMessage } from "@/app/components";
import { emailSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import {
  Flex,
  TextField,
  TextFieldInput,
  Button,
  Callout,
  Text
} from "@radix-ui/themes"; 
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
type ForgotFormData = z.infer<typeof emailSchema>
const ForgotPasswordForm = () => {
    const [error, setError] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
      } = useForm<ForgotFormData>({
        resolver: zodResolver(emailSchema),
      });
    
      const onSubmit = async (data: ForgotFormData) => {
        try{
          await axios.post('/api/users/forgot_password', data)

        }catch(error: any){
          setError(error.message)
        }
        
      }

  return (
    <>
      <Flex direction="column">
        <form className="space-y-3 mb-3" onSubmit={handleSubmit(onSubmit)}>

          <div className="space-y-1">
            <label>Email</label>
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

          <Button
            className="w-full "
            size="3"
            type="submit"
            disabled={isSubmitting || !isValid}
          >
           Send a request
          </Button>
        </form>
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      </Flex>
    </>
  );
};

export default ForgotPasswordForm;
