"use client";
import { Button, Flex, Dialog } from "@radix-ui/themes";

import { FetchedProjectType } from "../[id]/page";
import ProjectForm from "./ProjectForm";


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
        <Flex>
          <Dialog.Title>
            {project ? "Edit Your Project" : "Add New Project"}
          </Dialog.Title>
        </Flex>
        <ProjectForm project={project} />
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ProjectButtons;
