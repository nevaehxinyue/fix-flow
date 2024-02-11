"use client";
import {
  Button,
  Flex,
  Text,
  TextField,
  TextArea,
  Callout,
  RadioGroup,
  Dialog,
} from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { projectSchema } from "../../validationSchemas";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ErrorMessage } from "@/app/components";
import { FetchedProjectType } from "../[id]/page";
import { useQueryClient } from "@tanstack/react-query";
import ProjectStatusBadge from "./ProjectStatusBadge";
import toast, { Toaster } from "react-hot-toast";
import DeleteProjectButton from "../[id]/DeleteProjectButton";

type ProjectFormData = z.infer<typeof projectSchema>;
type ButtonVariants = 'soft'| 'classic'

const ProjectForm = ({ project }: { project?: FetchedProjectType | null }) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();
  const [submissionError, setSubmissionError] = useState("");
  const [ buttonVariant, setButtonVariant ] = useState<ButtonVariants>("soft");

  const { data: session } = useSession();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({ resolver: zodResolver(projectSchema) });

  const queryClient = useQueryClient();

  const onSubmit = handleSubmit(async (data) => {
    let response;
    try {
      setSubmitting(true);
      if (project) {
        const response = await axios.patch("/api/projects/" + project.id, data);
        if (response.status === 201) {
          toast.success("Your submission is successful!");
          router.refresh();
      
        }
        
      } else {
        const response = await axios.post("/api/projects", data);
        if (response.status === 201) {
          toast.success("Your submission is successful!");
          queryClient.invalidateQueries({ queryKey: ["projects"] });
        }
      }
    } catch (error) {
      setSubmissionError("An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <>
      {submissionError && (
        <Callout.Root color="red">
          <Callout.Text>{submissionError}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={onSubmit}>
        <Flex direction="column" gap="3" mt="6">
          <Flex direction="column" gap="2">
            <Text className="text-md font-bold mb-3" size="3">
              Project Name
            </Text>
            <TextField.Input
              placeholder="Enter the Name..."
              defaultValue={project?.title}
              {...register("title")}
            />
          </Flex>
          <ErrorMessage>{errors.title?.message}</ErrorMessage>

          <Flex direction="column" gap="2">
            <Text className="text-md font-bold mb-3" size="3">
              Description
            </Text>
            <TextArea
              placeholder="Enter the description..."
              defaultValue={project?.description || undefined}
              {...register("description")}
            />
          </Flex>
          <ErrorMessage>{errors.description?.message}</ErrorMessage>

          {project && (
            <>
            {/* // Change status */}
            <Flex direction="column" gap="2" align="start">
              <Text className="text-md font-bold mb-3" size="3">
                Change Status
              </Text>

              <Controller
                name="status"
                defaultValue={project.status}
                control={control}
                render={({ field }) => (
                  <RadioGroup.Root
                    {...field}
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <Flex gap="3">
                      <div>
                        <RadioGroup.Item value="OPEN"></RadioGroup.Item>
                        <ProjectStatusBadge status="OPEN" />
                      </div>
                      <div>
                        <RadioGroup.Item value="COMPLETED"></RadioGroup.Item>
                        <ProjectStatusBadge status="COMPLETED" />
                      </div>
                    </Flex>
                  </RadioGroup.Root>
                )}
              />
            </Flex>

            {/* // Options for deleting project */}
            <Flex direction="column" gap="2" align="start">
              <Text className="text-md font-bold mb-3" size="3">
                Remove project
              </Text>
              <Flex gap="3">
                 <Button onClick={() => setButtonVariant('classic')} type="button" size="1"color="gray" variant={buttonVariant}>No </Button>
                 
                 <DeleteProjectButton project={project}/>
                 </Flex>
               
            
            </Flex>

            </>

            
          )}
          {/* //Fetch creator userId from the session */}
          <input
            hidden={true}
            value={session?.user?.id}
            {...register("createdByUserId")}
          />

          <Flex justify="end" mt="9" gap="3">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <button className="theme-button" type="submit">Submit</button>
            <Toaster />
          </Flex>
        </Flex>
      </form>
    </>
  );
};

export default ProjectForm;
