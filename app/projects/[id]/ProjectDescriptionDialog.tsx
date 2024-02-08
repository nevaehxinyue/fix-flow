'use client'
import { Box, Button, Dialog, Flex, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
  projectTitle?: string | null;
  projectDescription?: string | null;
}

const ProjectDescriptionDialog = ({ projectTitle, projectDescription}: Props) => {
  const displayedDescription = projectDescription?.substring(0, 40) + "...";
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button className="hover:scale-110 hover:font-semibold ease-out duration-300">
        <Text className="text-white">{displayedDescription}</Text>
        </button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>{projectTitle}</Dialog.Title>
        <Flex direction="column" gap="5" mt="8">
        <Box className="border-0 rounded-lg shadow-lg bg-sky-50 p-4 h-60" >
        <Text size="3" mb="6" className="text-stone-600 font-semibold">{projectDescription}</Text>
        </Box> 
        <Dialog.Close>
            <Flex justify='end'>
            <Button variant="soft">Close</Button>
            </Flex>
        </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ProjectDescriptionDialog;
