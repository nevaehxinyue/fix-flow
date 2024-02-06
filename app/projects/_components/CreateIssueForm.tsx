import { ErrorMessage } from '@/app/components';
import { issueSchema, projectSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Text, Callout, Flex, TextField, TextArea, RadioGroup, Dialog } from '@radix-ui/themes';
import { Button } from '@react-email/components';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { z } from 'zod';

type CreateIssueFormData = z.infer<typeof issueSchema>;

const IssueForm = () => {
    const [isSubmitting, setSubmitting] = useState(false);
    const router = useRouter();
    const [submissionError, setSubmissionError] = useState("");
    
  
    const { data: session } = useSession();
  
    const {
      register,
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<CreateIssueFormData>({ resolver: zodResolver(issueSchema) });
  
    const queryClient = useQueryClient();
  
    const onSubmit = handleSubmit(async (data) => {
      let response;
      try {
        setSubmitting(true);
        if (project) {
          const response = await axios.patch("/api/projects/" + project.id, data);
          if (response.status === 201) {
            toast.success("Your submission is successful!");
          }
          router.refresh();
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
            Title
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
              Delete project
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

          <Button type="submit">Submit</Button>
          <Toaster />
        </Flex>
      </Flex>
    </form>
  </>
  )
}

export default IssueForm
