import { Box, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import ReactMarkdown from "react-markdown";
import { IssueStatusBadge } from "../../components";
import IssueSeverityBadge from "../../components/IssueSeverityBadge";


const IssueDetails = async ({
  searchParams,
}: {
  searchParams: { issueId: string };
}) => {
  if (!searchParams.issueId) return null;

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(searchParams.issueId) },
    include: {
     assignedToUser: true,
      createdBy: true,
    },
  });

  return (
    <Box>
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
