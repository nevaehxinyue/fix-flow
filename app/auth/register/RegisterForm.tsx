"use client";
import { userRegisterSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EnvelopeClosedIcon,
  InfoCircledIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";
import { PiUser } from "react-icons/pi";

import {
  TextField,
  TextFieldInput,
  Flex,
  Text,
  Callout,
} from "@radix-ui/themes";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

import { ErrorMessage } from "@/app/components";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

type PasswordFormData = z.infer<typeof userRegisterSchema>;
const RegisterForm = () => {
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset
  } = useForm<PasswordFormData>({
    resolver: zodResolver(userRegisterSchema),
  });

  const onSubmit = async (data: PasswordFormData) => {
    try {
      const response = await axios.post("/api/users/register", data);
      if (response.data.success) {
        setRegisterSuccess(true);
        reset(); 
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(`${error.response.data.error}`);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };
  console.log(errors)

  return (
    <>
      {registerSuccess && (
        <Callout.Root variant="soft" color="green">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            You account has been created successfully! You can log in now.
          </Callout.Text>
        </Callout.Root>
      )}
      <Flex direction="column">
        <form className="space-y-3 mb-3 w-[18rem]" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1 ">
            <label>Username </label>
            <TextField.Root>
              <TextField.Slot>
                <PiUser />
              </TextField.Slot>
              <TextFieldInput required size="3" {...register("name")} />
            </TextField.Root>
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
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
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          </div>

          <div className="space-y-1">
            <label>Password</label>
            <TextField.Root>
              <TextField.Slot>
                <LockClosedIcon />
              </TextField.Slot>

              <TextFieldInput
                type={isPasswordVisible ? "text" : "password"}
                placeholder="min 6 chracters"
                size="3"
                {...register("password")}
              />
              <button type="button" onClick={togglePasswordVisibility}>
                {isPasswordVisible ? (
                  <TextField.Slot>
                    <FaRegEyeSlash className="cursor-pointer" />
                  </TextField.Slot>
                ) : (
                  <TextField.Slot>
                    <FaRegEye className="cursor-pointer" />
                  </TextField.Slot>
                )}
              </button>
            </TextField.Root>
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </div>
          <button
            className="w-full h-[2.5rem] bg-button-color rounded-md hover:bg-button-hover-color font-semibold text-white text-xs p-2 justify-center"
            type="submit"
          >
            Submit
          </button>
          <Toaster />
        </form>
        <Text>
          Already have an account? <Link href="/auth/signin"><Text className="hover:text-blue-400 hover:font-semibold transition">Log in</Text></Link>
        </Text>
      </Flex>
    </>
  );
};

export default RegisterForm;
