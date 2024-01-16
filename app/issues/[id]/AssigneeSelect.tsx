"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/app/components";
import toast, { Toaster } from "react-hot-toast";
import { useId, useState } from "react";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {

  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, //60s
    retry: 3,
  });

  if (error) return null;

  if (isLoading) return <Skeleton height="2rem" />;

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={(userId) => {
          const userToAssign = users?.find(user => user.id === userId);
          axios
            .patch("/api/issues/" + issue.id, {
              assignedToUserId: userId === "unassigned" ? null : userId,
            })
            .then(() => {
              if (userId === "unassigned") {
                toast.success("Successfully unassigned!");
              } else {
                toast.success(`Successfully assigned to ${userToAssign?.name}!`);
              }
            })
            .catch(() => {
              toast.error("Change could not be saved.");
            })
            
        }}
      >
        <Select.Trigger placeholder="Assign to" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster
        toastOptions={{
          duration: 1500,
        }}
      />
    </>
  );
};

export default AssigneeSelect;
