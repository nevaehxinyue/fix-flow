import { Table, Flex, Card, Heading, Avatar, Text } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import Link from "next/link";
import { IssueStatusBadge } from "./components";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assingedToUser: true,
    },
  });

  return (
    <>
      <Heading size="4" mb="5">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" gap="2" align="start">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>{" "}
                    <IssueStatusBadge status={issue.status} />
                  </Flex>

                  {issue.assingedToUser && (
                    <Flex align="center" gap="2">
                      <Avatar
                        src={
                          issue.assingedToUser.image
                            ? issue.assingedToUser.image
                            : "/user_avatar2.svg"
                        }
                        fallback="?"
                        size="2"
                        radius="full"
                      />
                      <Text>{issue.assingedToUser.name!}</Text>
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
