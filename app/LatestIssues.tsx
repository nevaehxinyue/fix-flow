import { Table, Flex, Card, Heading, Avatar, Text } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import Link from "next/link";
import { IssueStatusBadge } from "./components";
import { Issue, User } from "@prisma/client";

interface LatestIssuesType {
  id: number;
  title: string;
  status: 'OPEN'|'IN_PROGRESS'|'CLOSED';
  projectId: number;
  assignedToUser?: User | null;
}

const LatestIssues = ({
  latestIssues,
}: {
  latestIssues: LatestIssuesType[];
}) => {

  return (
    <>
      <Heading size="4" mb="5">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {latestIssues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" gap="2" align="start">
                    <Link href={`/projects/${issue.projectId}?issueId=${issue.id}`}>{issue.title}</Link>{" "}
                    <IssueStatusBadge status={issue.status} />
                  </Flex>

                  {issue.assignedToUser && (
                    <Flex align="center" gap="2">
                      <Avatar
                        src={
                          issue.assignedToUser.image
                            ? issue.assignedToUser.image
                            : "/user_avatar2.svg"
                        }
                        fallback="?"
                        size="2"
                        radius="full"
                      />
                      <Text>{issue.assignedToUser.name!}</Text>
                    </Flex>
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default LatestIssues;
