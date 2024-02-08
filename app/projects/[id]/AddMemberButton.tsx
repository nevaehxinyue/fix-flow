"use client";
import {
  Button,
  Checkbox,
  Dialog,
  Flex,
  Separator,
  Text,
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
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const params = useParams();
  const router = useRouter();

  const handleCheckboxChange = (userId: string) => {
    setSelectedUserIds((prevSelectedUserIds) => {
      if (prevSelectedUserIds.includes(userId)) {
        return prevSelectedUserIds.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUserIds, userId];
      }
    });
  };

  const handleSubmit = async () => {
    if (selectedUserIds.length === 0) {
      toast.error("Please select at least one member to add.");
    } else {
      try {
        const response = await axios.post(
          `/api/projects/${params.id}/members`,
          {
            userIds: selectedUserIds,
          }
        );
        if (response.data.success) {
          toast.success("Members added successfully.");
          router.refresh();
        }
      } catch (error) {
        // Handle error
        toast.error("Error adding members.");
      }
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button className="theme-button">New Member</button>
      
      </Dialog.Trigger>
      <Dialog.Content>
        <Flex justify="between">
          <Dialog.Title>Add a new member</Dialog.Title>
          <Dialog.Close>
            <button className="mb-5 h-6 w-6 flex items-center justify-center rounded-full border-2 hover:bg-stone-200">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Flex>
        {projectAssginees.map((assignee) => (
          <Flex key={assignee.id} align="center" gap="5">
            <Checkbox
              value={assignee.id}
              checked={selectedUserIds.includes(assignee.id)}
              onCheckedChange={() => handleCheckboxChange(assignee.id)}
            />
            <Text>{assignee.name} </Text>
            <Separator orientation="vertical" />
            <Text>{assignee.email}</Text>
          </Flex>
        ))}
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
  );
};

export default AddMemberButton;
