import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Heading, Flex, Card } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({ issue }: {issue: Issue}) => {
  return (
    <>
      <Heading>{issue?.title}</Heading>
      <Flex gap="3" my="3">
        <IssueStatusBadge status={issue.status} />
        <p>{issue?.createdAt.toDateString()}</p>
      </Flex>
      <Card className="prose">
        <ReactMarkdown>{issue?.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
