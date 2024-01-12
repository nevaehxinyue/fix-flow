"use client";
import { Button, Callout, TextField, TextFieldInput } from "@radix-ui/themes";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const { register, control, handleSubmit } = useForm<IssueForm>();

  return (
    <div className="max-w-xl space-y-3">
    {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post("/api/issues", data);
          router.push("/issues");
        } catch (error) {
          setError("An unexpected error occurred.");
        }
      })}
      className="space-y-3 "
    >
      
      <TextField.Root>
        <TextFieldInput placeholder="Title" {...register("title")} />
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description..." {...field} />
        )}
      />
      <Button>Submit New Issue</Button>
    </form>
    </div>
  );
};

export default NewIssuePage;
