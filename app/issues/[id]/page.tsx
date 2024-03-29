import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { cache } from "react";

const fetchIssue = cache((issueId: number) => {
  return prisma.issue.findUnique({
    where: { id: issueId}
  })
})

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  const issue = await fetchIssue(parseInt(params.id));

  if (!issue) notFound();

  const session = await getServerSession(authOptions);

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="3">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="3">
            <AssigneeSelect issue={issue}/>
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;

export async function generateMetadata ({params}: {params: { id: string}}) {
  const issue = await fetchIssue(parseInt(params.id));
  return {
    title: issue?.title,
    description: 'Details of issue' + issue?.id 
  }
}
