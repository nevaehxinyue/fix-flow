"use client";
import { Text, Dialog, Flex } from "@radix-ui/themes";
import EditProfileForm from "./EditProfileForm";
import { useMenuDialogStore } from "./store";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

const EditProfileButton = () => {
  const { isDialogOpen, setIsDialogOpen, setIsMenuOpen } = useMenuDialogStore();
  const router = useRouter();

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
    setIsMenuOpen(true);
  };
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setIsMenuOpen(false);

  };

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Trigger>
        <button
          className="w-full flex justify-start"
          onClick={handleDialogOpen}
        >
          <Text>Edit profile</Text>
        </button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Flex justify="between" align="center">
          <Dialog.Title>Edit profie</Dialog.Title>
          <Dialog.Close>
            <button
              onClick={handleDialogClose}
              className="mb-5 h-6 w-6 flex items-center justify-center rounded-full border-2 hover:bg-stone-200"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Flex>
        <Dialog.Description size="2" mb="4">
          Make changes to your profile.
        </Dialog.Description>
        <EditProfileForm />
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditProfileButton;
