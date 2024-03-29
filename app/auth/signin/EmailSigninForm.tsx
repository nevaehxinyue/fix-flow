"use client";
import { ErrorMessage } from "@/app/components";
import { emailSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { Button, Flex, TextField, TextFieldInput } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaEnvelope } from "react-icons/fa6";

type EmailFormData = z.infer<typeof emailSchema>;

const EmailSigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (data: EmailFormData) => {
    await signIn("email", { email: data.email, callbackUrl: "/" });
  };
  return (
    <form className="space-y-5 mb-2 w-[15rem] sm:w-[18rem]" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
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
      <button
        className="w-full h-[2.5rem] bg-button-color rounded-md hover:bg-button-hover-color font-semibold text-white text-xs p-2 justify-center"
        type="submit"
      >
        <Flex gap="2" justify="center" align="center">
          Continue with email
          <FaEnvelope />
        </Flex>
      </button>
      {/* <Button  type="submit" className="w-full " size="3" >
      Continue with email<FaEnvelope />

    </Button> */}
    </form>
  );
};

export default EmailSigninForm;
