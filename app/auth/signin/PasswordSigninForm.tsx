"use client";
import { userSigninSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import {
  TextField,
  TextFieldInput,
  Flex,
  Button,
  Text,
  Callout,
} from "@radix-ui/themes";

import { ErrorMessage, Link } from "@/app/components";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useRouter } from "next/navigation";

type PasswordFormData = z.infer<typeof userSigninSchema>;
const PasswordSigninForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(userSigninSchema),
  });

  const onSubmit = async (data: PasswordFormData) => {
    try {
     
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false
      });
      console.log({result})
      if (result?.error) {
        if(result.error === 'CredentialsSignin'){
          setError("Your email or password is incorrect.")

        }
      } else {
        router.push('/')
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Flex direction="column">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-5 mb-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2 mt-3">
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
        <div className="space-y-2">
          <Flex justify="between">
            <label>Password</label>
            <Link href="/auth/forget">
              <Text size="2">Forget password?</Text>
            </Link>
          </Flex>
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
            <button
                type="button"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? (
                  <TextField.Slot>
                    <FaRegEyeSlash className="cursor-pointer"/>
                  </TextField.Slot>
                ) : (
                  <TextField.Slot>
                    <FaRegEye  className="cursor-pointer"/>
                  </TextField.Slot>
                )}
              </button>
          </TextField.Root>
        </div>
        <ErrorMessage>{errors.password?.message}</ErrorMessage>

        <Button
          className="w-full "
          size="3"
          type="submit"
            disabled={isSubmitting}
        >
          Sign in
        </Button>
      </form>
      
    </Flex>
  );
};

export default PasswordSigninForm;
