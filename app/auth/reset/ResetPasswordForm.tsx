"use client";
import { ErrorMessage } from "@/app/components";
import { passwordSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoCircledIcon, LockClosedIcon } from "@radix-ui/react-icons";

import {
  Flex,
  TextField,
  TextFieldInput,
  Callout,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

type ResetPasswordFormData = z.infer<typeof passwordSchema>;
const ResetPasswordForm = () => {
  const [error, setError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const router = useRouter();

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const verified = searchParams.get("verified");

  //Redirect the user to the login page if the reset password is not valid.
  useEffect(() => {
    if (!token || verified !== "true") {
      router.push("/auth/signin");
    }
  }, [token, verified, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      verifyToken: "",
      password: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      data.verifyToken = token as string;
      const response = await axios.post("/api/users/reset_password", data);
      if (response.data.success) {
        setRegisterSuccess(true);
        toast.success("Reset password successfully! ", { duration: 4000 });
        setTimeout(() => {
          router.push("/auth/signin");
        }, 3000); // Redirect the user to login page after 3s
      } else {
        // If the response does not have success true, handle accordingly
        setError("An error occurred during password reset.");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
      <Flex direction="column">
        {registerSuccess && (
          <Callout.Root variant="soft" color="green">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              <p className="flex flex-wrap">
              You will be redirected to log in page in seconds.
              </p>
            </Callout.Text>
          </Callout.Root>
        )}

        <form className="space-y-5 mb-3 w-[15rem] sm:w-[18rem] " onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1">
            <label>New password</label>
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
          </div>
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <button
            className="w-full h-[2.5rem] bg-button-color rounded-md hover:bg-button-hover-color font-semibold text-white text-xs p-2 justify-center"
            type="submit"
          >
            Reset
          </button>
          <Toaster />
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

export default ResetPasswordForm;
