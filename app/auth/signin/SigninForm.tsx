"use client";
import { credentialSchema, emailSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";

import {
  Text,
  Button,
  Card,
  TextField,
  TextFieldInput,
  Flex,
  Separator,
} from "@radix-ui/themes";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { Link } from "@/app/components";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";



// type SigninFormData = z.infer<typeof credentialSchema>;
type EmailFormData = z.infer<typeof emailSchema>;

export default function SigninForm() {
  // const [isContinue, setContinue] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (data: EmailFormData) => {
    console.log(`${data.email}`)
    // await axios.post('/api/')

    await signIn('email', { email: data.email, callbackUrl: '/'})
  }
  // async function onSubmit(data: SigninFormData) {
  //   try {
  //     await signIn("credentials", data, {
  //       callbackUrl: "http://localhost:3000",
  //     });
  //   } catch (error) {
  //     if (error instanceof AuthError) {
  //       switch (error.type) {
  //         case "CredentialsSignin":
  //           return "Invalid credentials.";
  //         default:
  //           return "Something went wrong.";
  //       }
  //     }
  //     throw error;
  //   }
  // }

  return (
    <Card size="5" className=" mt-2 ">
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
       <Button  type="submit" className="w-full " size="3" >
          Continue with email
        </Button>
        </form>
        
      
        
            {/* <div className="space-y-3">
              <Flex justify="between">
                <label>Password</label>
                <Link href="">
                  <Text size="2">Forget password?</Text>
                </Link>
              </Flex>
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
            </div> */}
            {/* <Button
              className="w-full "
              size="3"
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              Sign in
            </Button> */}
        
    
      <Flex direction="column" gap="2" align="center">
        <Text>
          Don't have an account? <Link href="">Create new account</Link>
        </Text>

        <Flex gap="3" align="center" className="w-full">
        <Separator  size="4" />
        <Text>or</Text>
        <Separator size="4" />
        </Flex>

        <Button
          size="3"
          className="w-full"
          onClick={() =>
            signIn("google", { callbackUrl: "http://localhost:3000" })
          }
        >
          Sign in with Google <FaGoogle />
        </Button>
  
      </Flex>
    </Card>
  );
}
