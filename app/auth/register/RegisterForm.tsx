"use client";
import { userRegisterSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { PiUser } from "react-icons/pi";

import {
  TextField,
  TextFieldInput,
  Flex,
  Button,
  Text,
  Callout,
  Box,
  Section,
} from "@radix-ui/themes";

import { Link } from "@/app/components";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

type PasswordFormData = z.infer<typeof userRegisterSchema>;
const RegisterForm = () => {
    const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(userRegisterSchema),
  });

  const onSubmit = async (data: PasswordFormData) => {
    try {
        await axios.post("/api/users/register", data)

    }catch(error) {
        if(axios.isAxiosError(error) && error.response) {
            setError(error.response.data.error)
        } else
        setError("An unexpected error occurred.");
    }
  };

  return (
    <>
    <Flex  direction="column">
    <form className="space-y-3 mb-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-1 ">
      <label>Username </label>
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

      <div className="space-y-1">
        <label>Password</label>
        <TextField.Root>
          <TextField.Slot>
            <LockClosedIcon />
          </TextField.Slot>

          <TextFieldInput
            placeholder="min 6 chracters"
            size="3"
            {...register("password")}
          />
        </TextField.Root>
      </div>
      <Button
        className="w-full "
        size="3"
        type="submit"
        disabled={isSubmitting || !isValid}
      >
        Submit
      </Button>
      
    </form>
    <Text >
          Already have an account? <Link href="/auth/signin">Log in</Link>
        </Text>
    </Flex>
    {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
    </>
  );
};

export default RegisterForm;
