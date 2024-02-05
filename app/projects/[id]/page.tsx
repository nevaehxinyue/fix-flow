import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { cache } from "react";
import ProjectMemberTable from "../_components/ProjectMemberTable";
import ProjectIssuesTable from "../_components/ProjectIssuesTable";
import IssueDetails from "../_components/IssueDetails";
import prisma from "@/prisma/client";
import AddMemberButton from "../_components/AddMemberButton";
import CommentDetails from "../_components/CommentDetails";

import { Skeleton } from "@/app/components";
import IssueCommentForm from "../_components/IssueCommentForm";
import ProjectButtons from "../_components/ProjectButtons";
import { ProjecOftUsers, User } from "@prisma/client";

// const IssueCommentForm = dynamic(() => import('../IssueCommentForm'), {
//   ssr:false,
//   loading: () => <Skeleton height="3rem"/>
// })

export interface FetchedProjectType {
  id: number;
  title: string;
  description: string | null;
  status: "OPEN" | "COMPLETED";
  createdBy: User;
  assignedToUsers: ProjecOftUsers[];
}

const fetchProject = cache((projectId: number) => {
  return prisma.project.findUnique({
    where: { id: projectId },
    include: {
      createdBy: true,
      assignedToUsers: {
        include: {
          user: true,
        },
      },
    },
  });
});

const ProjectDetialPage = async ({
  searchParams,
  params,
}: {
  searchParams: { issueId: string };
  params: { id: string };
}) => {
  const project = await fetchProject(parseInt(params.id));

  const creator = project!.createdBy;
  const assignedUsers = project?.assignedToUsers
    ? project?.assignedToUsers.map((assignment) => assignment.user)
    : [];
  const members = [creator, ...assignedUsers];

  return (
    <Flex direction="column">
      <Flex direction="column" gap="5">
        <Heading>Project</Heading>
        <Flex justify="between">
          <Heading size="5" mb="5">
            {project?.title}
          </Heading>
          <ProjectButtons project={project} />
        </Flex>
      </Flex>

      <Grid columns={{ initial: "1", md: "2" }} gap="8">
        <Card>
          <Flex justify="between" mb="5">
            <Heading size="4">Team</Heading>
            <AddMemberButton />
          </Flex>
          <ProjectMemberTable members={members} />
        </Card>
        <ProjectIssuesTable />

        <Box className="col-span-2">
          <Heading className="border-b pb-5" mb="5" size="4">
            Selected Issue Info
          </Heading>

          {searchParams.issueId && (
            <Grid columns={{ initial: "1", md: "2" }} gap="5">
              <IssueDetails searchParams={searchParams} />
              <Card className="space-y-5">
                <Heading className="border-b pb-4" size="4">
                  Comments
                </Heading>
                <CommentDetails issueId={searchParams.issueId} />
                <IssueCommentForm issueId={searchParams.issueId} />
                {/* <IssueComments issueId={searchParams.issueId} /> */}
              </Card>
            </Grid>
          )}
        </Box>
      </Grid>
    </Flex>
  );
};

export default ProjectDetialPage;
