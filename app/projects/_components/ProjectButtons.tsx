"use client";
import { Button, Flex, Dialog } from "@radix-ui/themes";

import { FetchedProjectType } from "../[id]/page";
import ProjectForm from "./ProjectForm";
import { Cross2Icon } from "@radix-ui/react-icons";


const ProjectButtons = ({
  project,
}: {
  project?: FetchedProjectType | null;
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>{project ? "Edit Project" : "New Project"}</Button>
      </Dialog.Trigger>
     
      <Dialog.Content className="max-w-md">
        <Flex justify="between" align="center">
          <Dialog.Title>
            {project ? "Edit Your Project" : "Add New Project"}
          </Dialog.Title>
          <Dialog.Close>
            <button
              className="mb-5 h-6 w-6 flex items-center justify-center rounded-full border-2 hover:bg-stone-200"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Flex>
        <ProjectForm project={project} />
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ProjectButtons;
