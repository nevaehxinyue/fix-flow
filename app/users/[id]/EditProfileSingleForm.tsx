"use client";
import DeleteUserProfileButton from "@/app/DeleteUserProfileButton";
import { ErrorMessage } from "@/app/components";
import { userProfileUpdateSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { Flex, TextField, Callout, Button, Text, Container, Heading } from "@radix-ui/themes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { z } from "zod";

type EditProfileFormData = z.infer<typeof userProfileUpdateSchema>;
type ButtonVariants = "soft" | "classic";
const EditProfileSingleForm = () => {
  const { data: session } = useSession();

  const [error, setError] = useState("");
  const [buttonVariant, setButtonVariant] = useState<ButtonVariants>("soft")
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const { data: user } = useQuery<User>({
    queryKey: ["user"],
    queryFn: () =>
      axios.get<User>(`/api/users/${session?.user.id}`).then((res) => res.data),
    staleTime: 7 * 24 * 60 * 60 * 1000, //7 days
    retry: 3,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(userProfileUpdateSchema),
  });

  const onSubmit = async (data: EditProfileFormData) => {
    const updateData: {
      name?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (data.name) {
      updateData.name = data.name;
    }
    if (data.password && data.confirmPassword) {
      // Check if the passwords match
      if (data.password !== data.confirmPassword) {
        setError("Passwords do not match.");
        return null;
      } else if (data.password.length < 6 || data.confirmPassword.length < 6) {
        setError("Minimum 6 characters are required.");
        return null;
      } else {
        updateData.password = data.password;
        updateData.confirmPassword = data.confirmPassword;
      }
    } else if (data.password || data.confirmPassword) {
      setError("Please fill both password fields to update your password.");
      return null;
    }

    try {
      const response = await axios.patch(
        `/api/users/${session?.user.id}`,
        updateData
      );
      if (response.data.success) {
        toast.success("Your changes have been saved!");
        // Make sure the page that the user is currently on reflects the user profile changes
        queryClient.refetchQueries({ queryKey: ["projects"] });
        queryClient.refetchQueries({ queryKey: ["user"] });
        
      }
    } catch (error) {
      setError("Profile update failed.Please try again.");
    }
  };

  return (
    <Flex direction="column" gap="3" className="bg-white shadow-lg border-0 p-8 rounded-lg w-[20rem] xl:w-96">
      <form onSubmit={handleSubmit(onSubmit)} >
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

        <Flex direction="column" gap="2" align="start" mt="3">
          <Text className="text-md font-bold mb-3" size="3">
            Delete profile
          </Text>
          <Flex gap="3">
            <Button
              onClick={() => setButtonVariant("classic")}
              type="button"
              size="1"
              color="gray"
              variant={buttonVariant}
            >
              No
            </Button>
            <DeleteUserProfileButton />
          </Flex>
        </Flex>

        <Flex gap="3" mt="6" justify="end">
          <Button variant="soft" color="gray">
            Cancel
          </Button>

          <button className="theme-button" type="submit">
            Save
          </button>

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

export default EditProfileSingleForm;
