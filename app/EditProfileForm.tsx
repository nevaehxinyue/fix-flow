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

type EditProfileFormData = z.infer<typeof userProfileUpdateSchema>;

const EditProfileForm = () => {
  const router = useRouter();
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

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(userProfileUpdateSchema),
  });

  const onSubmit = async (data: EditProfileFormData) => {
    try {
      // Check if the passwords match
      if (data.password !== data.confirmPassword) {
        setError("Passwords do not match.");
        return null;
      }
      const response = await axios.patch("api/users/" + session.user.id, data);
      if (response.data.success) {
        toast.success("Your changes have been saved!");
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
              placeholder={session?.user.name}
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
          <Button type="submit">Save</Button>
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
