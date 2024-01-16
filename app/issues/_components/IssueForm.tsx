"use client";
import { ErrorMessage, IssueStatusBadge, Spinner } from "@/app/components";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Callout,
  TextField,
  TextFieldInput,
  Button,
  RadioGroup,
  Flex,
  Text,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import "easymde/dist/easymde.min.css";
import { Issue } from "@prisma/client";
import SimpleMDE from "react-simplemde-editor";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();

  // The 'errors' object is populated by 'react-hook-form' when validation errors occur
  // based on the schema validation with Zod
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (issue) 
        await axios.patch('/api/issues/' + issue.id, data);
      else 
        await axios.post('/api/issues', data);
    router.push("/issues/list"); 
    router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred.");
    }
  });

  return (
    <div className="max-w-xl space-y-3">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={onSubmit} className="space-y-3 ">
        <TextField.Root>
          <TextFieldInput
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="status"
          defaultValue={issue?.status || "OPEN"}
          control={control}
          render={({ field }) => (
            <RadioGroup.Root
              {...field}
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
              }}
            >
              <Flex gap="2" direction="row">
                <Text as="label" size="2" className="flex gap-2">
                  <RadioGroup.Item value="OPEN" />
                  <IssueStatusBadge status="OPEN" />
                </Text>

                <Text as="label" size="2" className="flex gap-2">
                  <RadioGroup.Item value="IN_PROGRESS" />
                  <IssueStatusBadge status="IN_PROGRESS" />
                </Text>

                <Text as="label" size="2" className="flex gap-2">
                  <RadioGroup.Item value="CLOSED" />
                  <IssueStatusBadge status="CLOSED" />
                </Text>
              </Flex>
            </RadioGroup.Root>
          )}
        />
        <ErrorMessage>{errors.status?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description..." {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue ? "Update Issue" : "Submit New Issue"}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
