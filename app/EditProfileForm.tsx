import {
  Button,
  Callout,
  Dialog,
  Flex,
  Text,
  TextField,
} from "@radix-ui/themes";
import React, { useState } from "react";
import { ErrorMessage } from "./components";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { userProfileUpdateSchema } from "./validationSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useMenuDialogStore } from "./store";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "@prisma/client";



type EditProfileFormData = z.infer<typeof userProfileUpdateSchema>;


const EditProfileForm = () => {

  const [error, setError] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  const { setIsDialogOpen, setIsMenuOpen } = useMenuDialogStore();

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setIsMenuOpen(false);
    router.refresh();
  };

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const { data: session } = useSession();
  if (!session) return null;

  const { data: user } = useQuery<User>({
        queryKey: ['user'],
        queryFn: () => axios.get<User>(`/api/users/${session.user.id}`).then((res) => res.data),
        staleTime: 7 * 24 * 60 * 60 * 1000, //7 days
        retry: 3,
  })


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(userProfileUpdateSchema),
  });

  const onSubmit = async (data: EditProfileFormData) => {
    const updateData: { name?: string; password?: string, confirmPassword?: string} = {};
    
    if(data.name) {
        updateData.name = data.name;
    }
    if(data.password && data.confirmPassword){
          // Check if the passwords match
        if (data.password !== data.confirmPassword) {
            setError("Passwords do not match.");
            return null;
          }else if (data.password.length < 6 || data.confirmPassword.length < 6) {
                setError("Minimum 6 characters are required.");
                return null;
          }
          else{
            updateData.password = data.password;
            updateData.confirmPassword = data.confirmPassword
        }

    }  else if (data.password || data.confirmPassword) {
        setError('Please fill both password fields to update your password.');
        return null;
    }
 
    try {
      
      const response = await axios.patch(`/api/users/${session.user.id}`, updateData);
      if (response.data.success) {
        toast.success("Your changes have been saved!");
        // Make sure the page that the user is currently on reflects the user profile changes
        queryClient.invalidateQueries({ queryKey: ["projects"]});
      }
    } catch (error) {
      setError("Profile update failed.Please try again.");
    }
  };

  return (
    <Flex direction="column" gap="3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
            <TextField.Input
              placeholder={user?.name || undefined}
              {...register("name")}
            />
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Password
            </Text>

            <Flex direction="column" gap="3">
              {/* //New Password */}
              <TextField.Root>
                <TextField.Input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="New password"
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

              {/* //Confirm new password */}
              <TextField.Root>
                <TextField.Input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Confirm new password"
                  {...register("confirmPassword")}
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
            </Flex>
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray" onClick={handleDialogClose}>
              Cancel
            </Button>
          </Dialog.Close>
          <button className="theme-button" type="submit">
            Save</button>

          <Toaster />
        </Flex>
      </form>
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
    </Flex>
  );
};

export default EditProfileForm;
