"use client";
import { Comment, User } from "@prisma/client";
import { Box, Text, Flex, Avatar } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/app/components";
import { format } from "date-fns";

interface CommentType {
  id: number;
  content: string;
  createdAt: Date;
  createdBy: User;
}

interface CommentApiResponse  {

    comments: CommentType[]

  
}
const CommentDetails = ({ issueId }: { issueId: string }) => {
  const {
    data: commentsResponse,
    error,
    isLoading,
  } = useQuery<CommentApiResponse>({
    queryKey: ["comments"],
    queryFn: () =>
      axios
        .get<CommentApiResponse>(`/api/comments/issue/${issueId}`)
        .then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
   
  });
  
  if (error) return null;
  if (isLoading) return <Skeleton height="3rem" />;

  return (
    <>
      {commentsResponse?.comments?.map((comment) => (
        <Box key={comment.id} p="2">
          <Flex direction="column">
            <Flex align="center" gap="2">
              <Avatar
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
            <Text ml="8" className="text-lg">{comment.content}</Text>
          </Flex>
        </Box>
      ))}
    </>
  );
};

export default CommentDetails;
