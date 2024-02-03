"use client";
import { ErrorMessage } from "@/app/components";
import { passwordSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockClosedIcon } from "@radix-ui/react-icons";

import {
  Flex,
  TextField,
  TextFieldInput,
  Button,
  Callout,
  Text,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
type ResetPasswordFormData = z.infer<typeof passwordSchema>;
const ResetPasswordForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const verified = searchParams.get("verified");

  //Redirect the user to the login page if the reset password is not valid.
  useEffect(() => {
    if (!token || verified !== "true") {
      router.push("/auth/signin");
    }
  }, [token, verified]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
        verifyToken:"",
        password: ""
    }
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      data.verifyToken = token as string;
      await axios.post("/api/users/reset_password", data);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
      <Flex direction="column">
        <form className="space-y-3 mb-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1">
            <label>New password</label>
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
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <Button
            className="w-full "
            size="3"
            type="submit"
            disabled={isSubmitting || !isValid}
          >
            Reset
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

export default ResetPasswordForm;
