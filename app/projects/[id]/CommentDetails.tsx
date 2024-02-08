"use client";
import { User } from "@prisma/client";
import { Box, Text, Flex, Avatar } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/app/components";
import { format } from "date-fns";
import DeleteCommentButton from "./DeleteCommentButton";
import { useSession } from "next-auth/react";

interface CommentType {
  id: number;
  content: string;
  createdAt: Date;
  createdBy: User;
}

const CommentDetails = ({ issueId }: { issueId: string }) => {
  const { data: sesion } = useSession(); 
  const {
    data: comments,
    error,
    isLoading,
  } = useQuery<CommentType[]>({
    queryKey: ["comments", issueId],
    queryFn: () =>
      axios
        .get<CommentType[]>(`/api/comments/issue/${issueId}`)
        .then((res) => res.data),
    staleTime: 60 * 1000,//60s
    retry: 3,  
  });
  
  if (error) return null;
  if (isLoading) return <Skeleton height="3rem" />;



  return (
    <>
      {comments?.map((comment) => (
        <Box key={comment.id} p="2">
          <Flex direction="column">
            <Flex align="center" gap="2">
              <Avatar
                size="2"
                src={comment.createdBy.image!}
                fallback="?"
                radius="full"
              />
              <Text className="font-bold">{comment.createdBy.name} </Text>
              <Text className="text-sm">
                -{" "}
                {format(
                  new Date(comment.createdAt),
                  "MMM do yyy, H:mm:ss aaa "
                )}
              </Text>
            </Flex>
            <Flex justify="between">
            <Text ml="8" size="2" >{comment.content}</Text>
            {/* //Make sure only the user who wrote the comment can delete the comment. */}
            {comment.createdBy.id === sesion?.user.id && <DeleteCommentButton commentId={comment.id} />}
            </Flex>
          </Flex>
        </Box>
      ))}
    </>
  );
};

export default CommentDetails;
