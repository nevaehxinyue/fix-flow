'use client'
import { Box, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import ReactMarkdown from "react-markdown";
import { ErrorMessage, IssueStatusBadge, Skeleton } from "../../components";
import IssueSeverityBadge from "../../components/IssueSeverityBadge";
import { useEffect, useState } from "react";
import { Issue, User } from "@prisma/client";

interface FetchedIssueType {
  title: string;
  description?: string;
  status: 'OPEN' | "IN_PROGRESS" | 'CLOSED';
  severity: 'MINOR' | 'MEDIUM'| 'MAJOR' | 'CRITICAL';
  createdAt: Date;
  createdBy: User;
  assignedToUser: User | null ;
}

const IssueDetails = ({
  searchParams,
}: {
  searchParams: { issueId: string };
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [issue, setIssue ] = useState<FetchedIssueType>();
  const [ error, setError ] = useState('');

  useEffect(() => {
    const fetchIssue = async() => {
      setIsLoading(true);
      try {
        const issue = await prisma.issue.findUnique({
          where: { id: parseInt(searchParams.issueId) },
          include: {
           assignedToUser: true,
            createdBy: true,
          },
        });
        if(issue) {
          const transformedIssue: FetchedIssueType = {
            title: issue.title,
            description: issue.description,
            status: issue.status,
            severity: issue.severity,
            createdAt: issue.createdAt,
            createdBy:issue.createdBy,
            assignedToUser: issue.assignedToUser,
          };
          setIssue(transformedIssue);
        }
    
      }catch(error){
       setError("Failed to fetch issue.");
      }
      setIsLoading(false);
    };
    fetchIssue();
  
  }, [searchParams.issueId])

  // if(!issue) {
  //   return <Text className="font-semibold" size="3">No issue details available.</Text>;
  // }

  if(isLoading) return (
    <Box>
    <Grid columns="3" gap="5">
      <Flex direction="column" gap="3">
        <Text className="text-gray-400 font-bold">Issue Title</Text>
       <Skeleton height="3rem"/>
      </Flex>

      <Flex direction="column" gap="3">
        <Text className="text-gray-400 font-bold">Creator</Text>
         <Skeleton height="2rem"/>
      </Flex>

      <Flex direction="column" gap="3">
        <Text className="text-gray-400 font-bold">Assignee</Text>
        <Skeleton height="2rem"/>
      </Flex>

      <Flex direction="column" gap="3" align="start">
        <Text className="text-gray-400 font-bold">Status</Text>
        <Skeleton height="2rem"/>
      </Flex>

      <Flex direction="column" gap="3" align="start">
        <Text className="text-gray-400 font-bold">Severity</Text>
        <Skeleton height="2rem"/>
      </Flex>

      <Flex direction="column" gap="3" align="start">
        <Text className="text-gray-400 font-bold">Created at</Text>
        <Skeleton height="2rem"/>
      </Flex>

      <Flex className="col-span-3 border-t-2">
        <Flex direction="column" gap="3" mt="4" mb="4">
          <Text className="text-gray-400 font-bold">Description</Text>
          <Skeleton height="4rem"/>
        </Flex>
      </Flex>
    </Grid>
  </Box>

  )
  
  return (
    <Box>
      {error &&  <ErrorMessage>{error}</ErrorMessage>}
      <Grid columns="3" gap="5">
        <Flex direction="column" gap="3">
          <Text className="text-gray-400 font-bold">Issue Title</Text>
          <Heading size="4" color="bronze">
            {issue?.title}
          </Heading>
        </Flex>

        <Flex direction="column" gap="3">
          <Text className="text-gray-400 font-bold">Creator</Text>
          <Text size="2">{issue?.createdBy.name}</Text>
        </Flex>

        <Flex direction="column" gap="3">
          <Text className="text-gray-400 font-bold">Assignee</Text>
          <Text size="2">{issue?.assignedToUser?.name}</Text>
        </Flex>

        <Flex direction="column" gap="3" align="start">
          <Text className="text-gray-400 font-bold">Status</Text>
          <IssueStatusBadge status={issue!.status} />
        </Flex>

        <Flex direction="column" gap="3" align="start">
          <Text className="text-gray-400 font-bold">Severity</Text>
          <IssueSeverityBadge severity={issue!.severity} />
        </Flex>

        <Flex direction="column" gap="3" align="start">
          <Text className="text-gray-400 font-bold">Created at</Text>
          <Text size="2"> {issue!.createdAt.toDateString()}</Text>
        </Flex>

        <Flex className="col-span-3 border-t-2">
          <Flex direction="column" gap="3" mt="4" mb="4">
            <Text className="text-gray-400 font-bold">Description</Text>
            <ReactMarkdown>{issue?.description}</ReactMarkdown>
          </Flex>
        </Flex>
      </Grid>
    </Box>
  );
};

export default IssueDetails;
