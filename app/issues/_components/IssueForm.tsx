'use client';
import { ErrorMessage, Spinner } from '@/app/components';
import { createIssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Callout, TextField, TextFieldInput, Button } from '@radix-ui/themes';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import "easymde/dist/easymde.min.css";
import { Issue } from '@prisma/client';

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {ssr: false})

type IssueFormData = z.infer<typeof createIssueSchema>;

const IssueForm = ({ issue } : { issue?: Issue}) => {
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
    resolver: zodResolver(createIssueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred.");
    }
  })

  return (
    <div className="max-w-xl space-y-3">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={onSubmit} className="space-y-3 ">
        <TextField.Root>
          <TextFieldInput defaultValue={issue?.title} placeholder="Title" {...register("title")} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
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
          Submit New Issue{isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default IssueForm
