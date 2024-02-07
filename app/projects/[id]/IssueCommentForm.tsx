"use client";
import {
  Button,
  Callout,
  Flex,
  TextFieldInput,
} from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "../../validationSchemas";
import { z } from "zod";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { ErrorMessage } from "../../components";
import { useSession } from "next-auth/react";

import { useQueryClient } from "@tanstack/react-query";

type CommentFormSchema = z.infer<typeof commentSchema>;

const IssueCommentForm = ({ issueId }: { issueId: string }) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  
  const { data: session } = useSession();
 
// setValue here is used to ensure 'session.user.id' is submittedd with the form.

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CommentFormSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
      belongedToIssueId: parseInt(issueId),
      createdByUserId:  "",
    },
  });

  useEffect(() => {
    if(session?.user?.id) {
      setValue('createdByUserId', session.user.id);
    }
  }, [session, setValue])

  // Refetch the comments after the user submit a comment 

  const queryClient = useQueryClient();

  const onSubmit = handleSubmit(async (data) => {
    // event?.preventDefault();
    try {
      setSubmitting(true);
      await axios.post("/api/comments", data);
      queryClient.invalidateQueries({ queryKey: ['comments']});

    } catch (error) {
      setError("An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  });


  return (
    <div>
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="space-y-5 mt-4" onSubmit={onSubmit}>
        <Flex gap="3">

          <ErrorMessage>{errors.belongedToIssueId?.message}</ErrorMessage>

          <ErrorMessage>{errors.createdByUserId?.message}</ErrorMessage>
          <div className="w-full">
            <TextFieldInput
              placeholder="Comment here..."
              {...register("content")}
            />
          </div>
          <Button disabled={isSubmitting} type="submit">
            Comment
          </Button>
  
        </Flex>
        <ErrorMessage>{errors.content?.message}</ErrorMessage>
      </form>
    </div>
  );
};

export default IssueCommentForm;
