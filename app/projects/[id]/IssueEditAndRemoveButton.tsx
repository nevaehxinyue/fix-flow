import { Cross2Icon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { Dialog, Flex } from "@radix-ui/themes";
import React from "react";
import IssueButtons from "../_components/IssueButtons";
import { Issue } from "@prisma/client";
import IssueForm from "../_components/IssueForm";

const IssueEditAndRemoveButton = ({ issue }: { issue: Issue }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button>
          <DotsVerticalIcon />
          </button>
      </Dialog.Trigger>

      <Dialog.Content className="max-w-md">
        <Flex justify="between" align="center">
          <Dialog.Title>
            Edit issue
          </Dialog.Title>
          <Dialog.Close>
            <button
              className="mb-5 h-6 w-6 flex items-center justify-center rounded-full border-2 hover:bg-stone-200"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Flex>
        <IssueForm issue={issue} />
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default IssueEditAndRemoveButton;
