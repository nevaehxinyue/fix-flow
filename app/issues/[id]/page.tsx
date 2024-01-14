import ReactMarkdown from "react-markdown";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Card, Flex, Grid, Heading, Box, Button } from "@radix-ui/themes";
import { IssueStatusBadge } from "@/app/components";
import { Pencil2Icon  } from "@radix-ui/react-icons";
import Link from "next/link";

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="3">
      <Box>
        <Heading>{issue?.title}</Heading>
        <Flex gap="3" my="3">
          <IssueStatusBadge status={issue.status} />
          <p>{issue?.createdAt.toDateString()}</p>
        </Flex>
        <Card className="prose">
          <ReactMarkdown>{issue?.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
            <Pencil2Icon />
            <Link href={`/issues/${issue.id}/edit`} >Edit Issue</Link>
           </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
