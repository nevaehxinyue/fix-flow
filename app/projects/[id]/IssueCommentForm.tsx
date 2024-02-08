"use client";
import {
  Callout,
  Flex,
  TextFieldInput,
} from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "../../validationSchemas";
import { z } from "zod";
import { useState } from "react";
import axios from "axios";
import { ErrorMessage } from "../../components";

import { useQueryClient } from "@tanstack/react-query";


type CommentFormSchema = z.infer<typeof commentSchema>;

const IssueCommentForm = ({issueId}: {issueId: string}) => {

  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");


  console.log(issueId);

// setValue here is used to ensure 'session.user.id' is submittedd with the form.

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CommentFormSchema>({
    resolver: zodResolver(commentSchema),
  });

  // useEffect(() => {
  //   if(session?.user?.id) {
  //     setValue('createdByUserId', session.user.id);
  //   }
  // }, [session, setValue])

  // Refetch the comments after the user submit a comment 

  const queryClient = useQueryClient();

  const onSubmit = async (data: CommentFormSchema) => {
    // event?.preventDefault();
    try {
      setSubmitting(true);
      await axios.post(`/api/comments/issue/${issueId}`, data);
      queryClient.refetchQueries({ queryKey: ['comments']});
      reset();
    } catch (error) {
      setError("An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };
  console.log(errors)


  return (
    <div>
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="space-y-5 mt-4" onSubmit={handleSubmit(onSubmit)}>
        <Flex gap="3">
          <div className="w-full">
            <TextFieldInput
              // autoComplete="off"
              placeholder="Comment here..."
              {...register("content")}
            />
          </div>
          {/* <input hidden={true} value={issueId} {...register('belongedToIssueId')}/> */}
          <button className="theme-button" type="submit" disabled={isSubmitting}>Comment</button>
        </Flex>
        <ErrorMessage>{errors.content?.message}</ErrorMessage>
      </form>
    </div>
  );
};

export default IssueCommentForm;
