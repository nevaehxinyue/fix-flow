import { ErrorMessage, IssueStatusBadge } from "@/app/components";
import IssueSeverityBadge from "@/app/components/IssueSeverityBadge";
import AssigneeSelect from "@/app/issues/[id]/AssigneeSelect";
import { issueSchema, projectSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import {
  Button,
  Text,
  Callout,
  Flex,
  TextField,
  TextArea,
  RadioGroup,
  Dialog,
} from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import DeleteIssueButton from "../[id]/DeleteIssueButton";

type CreateIssueFormData = z.infer<typeof issueSchema>;
type ButtonVariants = "soft" | "classic";

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const [submissionError, setSubmissionError] = useState("");
  const [buttonVariant, setButtonVariant] = useState<ButtonVariants>("soft");

  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateIssueFormData>({ resolver: zodResolver(issueSchema) });

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (issue) {
        const response = await axios.patch("/api/issues/" + issue.id, data);
        if (response.status === 201) {
          toast.success("Your submission is successful!");
        }
        router.refresh();
      } else {
        const response = await axios.post("/api/issues", data);
        if (response.status === 201) {
          toast.success("Your submission is successful!");
          router.refresh();
        }
      }
    } catch (error) {
      setSubmissionError("An unexpected error occurred.");
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
              placeholder="Enter the title..."
              defaultValue={issue?.title}
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
              defaultValue={issue?.description}
              {...register("description")}
            />
          </Flex>
          <ErrorMessage>{errors.description?.message}</ErrorMessage>

          <Flex direction="column" gap="2" align="start">
            <Text className="text-md font-bold mb-3" size="3">
              Status
            </Text>
            <Controller
              name="status"
              defaultValue={issue?.status}
              control={control}
              render={({ field }) => (
                <RadioGroup.Root
                  {...field}
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <Flex gap="3" align="center">
                    <Flex gap="3" align="center">
                      <RadioGroup.Item value="OPEN"></RadioGroup.Item>
                      <IssueStatusBadge status="OPEN" />
                    </Flex>
                    <Flex gap="3" align="center">
                      <RadioGroup.Item value="IN_PROGRESS"></RadioGroup.Item>
                      <IssueStatusBadge status="IN_PROGRESS" />
                    </Flex>
                    <Flex gap="3" align="center">
                      <RadioGroup.Item value="CLOSED"></RadioGroup.Item>
                      <IssueStatusBadge status="CLOSED" />
                    </Flex>
                  </Flex>
                </RadioGroup.Root>
              )}
            />
          </Flex>

          <Flex direction="column" gap="2" align="start">
            <Text className="text-md font-bold mb-3" size="3">
              Severity
            </Text>
            <Controller
              name="severity"
              defaultValue={issue?.severity}
              control={control}
              render={({ field }) => (
                <RadioGroup.Root
                  {...field}
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <Flex gap="3" align="center">
                    <Flex gap="3" align="center">
                      <RadioGroup.Item value="MINOR"></RadioGroup.Item>
                      <IssueSeverityBadge severity="MINOR" />
                    </Flex>
                    <Flex gap="3" align="center">
                      <RadioGroup.Item value="MEDIUM"></RadioGroup.Item>
                      <IssueSeverityBadge severity="MEDIUM" />
                    </Flex>
                    <Flex gap="3" align="center">
                      <RadioGroup.Item value="MAJOR"></RadioGroup.Item>
                      <IssueSeverityBadge severity="MAJOR" />
                    </Flex>
                    <Flex gap="3" align="center">
                      <RadioGroup.Item value="CRITICAL"></RadioGroup.Item>
                      <IssueSeverityBadge severity="CRITICAL" />
                    </Flex>
                  </Flex>
                </RadioGroup.Root>
              )}
            />
          </Flex>
          {issue && (
            <>
              <Flex direction="column" gap="2" align="start">
                <Text className="text-md font-bold mb-3" size="3">
                  Assignee
                </Text>
                <AssigneeSelect issue={issue} />
              </Flex>

              {(issue.createdByUserId === session?.user.id ||
                issue.assignedToUserId === session?.user.id) && (
                <Flex direction="column" gap="2" align="start">
                  <Text className="text-md font-bold mb-3" size="3">
                    Remove issue
                  </Text>
                  <Flex gap="3">
                    <Button
                      onClick={() => setButtonVariant("classic")}
                      type="button"
                      size="1"
                      color="gray"
                      variant={buttonVariant}
                    >
                      No{" "}
                    </Button>
                    <DeleteIssueButton issue={issue} />
                  </Flex>
                </Flex>
              )}
            </>
          )}

          {/* //Fetch creator userId from the session */}
          <input
            hidden={true}
            value={session?.user?.id}
            {...register("createdByUserId")}
          />

          {/* //Fetch project Id the issue belongs to  */}
          <input hidden={true} value={params.id} {...register("projectId")} />

          <Flex justify="end" mt="9" gap="3">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>

            <button className="theme-button" type="submit" disabled={isSubmitting}>Submit</button>
            <Toaster />
          </Flex>
        </Flex>
      </form>
    </>
  );
};

export default IssueForm;
