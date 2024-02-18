"use client";
import {
  AlertDialog,
  Button,
  Checkbox,
  Dialog,
  Flex,
  Separator,
  Text,
  TextFieldInput,
} from "@radix-ui/themes";
import { User } from "@prisma/client";
import axios from "axios";
import { Cross2Icon } from "@radix-ui/react-icons";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Props {
  projectAssginees: User[];
}

const AddMemberButton = ({ projectAssginees }: Props) => {
  // const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [memberEmail, setMemberEmail] = useState("");
  const [error, setError] = useState(false);
  const params = useParams();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`/api/projects/${params.id}/members`, {
        memberEmail: memberEmail,
      });
      if (response.data.error) {
        setError(true);

      }
      if (response.data.success) {
        toast.success("Member added successfully.");
        setMemberEmail("");
        router.refresh();
      }
    } catch (error) {
      // Handle error
      toast.error("Something went wrong. Please try again. ");
    }
  };

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <button className="theme-button">New Member</button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Flex justify="between">
            <Dialog.Title>New team member</Dialog.Title>
            <Dialog.Close>
              <button className="mb-5 h-6 w-6 flex items-center justify-center rounded-full border-2 hover:bg-stone-200">
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Flex>
          <Flex direction="column" gap="3">
            <label>Type member&apos;s email here: </label>
            <TextFieldInput
              name="memberEmail"
              value={memberEmail}
              onChange={(e) => setMemberEmail(e.target.value)}
            />
          </Flex>
    
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <button
              type="submit"
              onClick={handleSubmit}
              className="theme-button w-1/7"
            >
              Add
            </button>

            <Toaster />
          </Flex>
        </Dialog.Content>
      </Dialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>
            Note
          </AlertDialog.Title>
          <AlertDialog.Description>
            The memeber doesn&apos;t exist. 
          </AlertDialog.Description>
          <Flex justify="end">
          <Button
            color="gray"
            variant="soft"
            mt="3"
            onClick={() => setError(false)}
          >
            OK
          </Button>
        </Flex>
        </AlertDialog.Content>
        </AlertDialog.Root>
    </>
  );
};

export default AddMemberButton;
