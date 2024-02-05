"use client";
import { ErrorMessage } from "@/app/components";
import { userProfileUpdateSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Callout,
  Dialog,
  Flex,
  TextField,
  TextFieldInput,
  Text,
} from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

import { z } from "zod";

type usernameFormData = z.infer<typeof userProfileUpdateSchema>;

const UsernameChangeForm = () => {
  const [error, setError] = useState("");
  const { data: session } = useSession();
  const router = useRouter();


  console.log(`session: ${session}`);

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<usernameFormData>({
      resolver: zodResolver(userProfileUpdateSchema),
    });

    const onSubmit = async (data: usernameFormData) => {
      try {
        const response = await axios.patch(
          "/api/users/" + session?.user.id,
          data
        );
        if (response.data.success) {
          toast.success(
            "Your username has been updated successfully! You'll be redirected the dashboard in seconds."
          );
          router.refresh();
          
        }
      } catch (error) {
        setError("Something went wrong. Username cannot be saved.");
      }
    };
  

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button ml="2" size="1">
          Change name
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Change your username</Dialog.Title>
        {error && (
          <Callout.Root color="red">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
            <TextField.Input
              placeholder={session?.user.name}
              {...register("name")}
            />
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
          </label>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button type="submit">Save</Button>
            </Dialog.Close>
            <Toaster />
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default UsernameChangeForm;
