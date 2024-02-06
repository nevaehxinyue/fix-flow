import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { cache } from "react";
import ProjectMemberTable from "./ProjectMemberTable";
import ProjectIssuesTable from "./ProjectIssuesTable";
import IssueDetails from "./IssueDetails";
import prisma from "@/prisma/client";
import AddMemberButton from "./AddMemberButton";
import CommentDetails from "./CommentDetails";
import { Skeleton } from "@/app/components";
import IssueCommentForm from "./IssueCommentForm";
import ProjectButtons from "../_components/ProjectButtons";
import { ProjecOftUsers, User } from "@prisma/client";
import { all } from "axios";
import Pagination from "@/app/components/Pagination";

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
  searchParams: { issueId: string; page: string };
  params: { id: string };
}) => {
  const projectId = parseInt(params.id);
  const project = await fetchProject(projectId);

  const creator = project!.createdBy;
  const assignedUsers = project?.assignedToUsers
    ? project?.assignedToUsers.map((assignment) => assignment.user)
    : [];
  const members = [creator, ...assignedUsers];
  const membersIds = members.map((member) => member.id);
  const allUsers = await prisma.user.findMany();
  const projectAssginees = allUsers.filter(
    (user) => !membersIds.includes(user.id)
  );

  //Fetch issues on each page
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 3;

  const issuesOnEachPage = await prisma.issue.findMany({
    where: { projectId: projectId },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issuesCount = await prisma.issue.count({
    where: { projectId: projectId },
  });

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

      <Text mb="5">{project?.description}</Text>

      <Grid columns={{ initial: "1", md: "3" }} gap="8">
        <Card>
          <Flex justify="between" mb="5">
            <Heading size="4">Team</Heading>
            <AddMemberButton projectAssginees={projectAssginees} />
          </Flex>
          <ProjectMemberTable members={members} />
        </Card>

        <Card className="p-0 col-span-2" >
          <ProjectIssuesTable issuesOnEachPage={issuesOnEachPage} />
          <Flex  justify="center">
            <Pagination
              itemCount={issuesCount}
              pageSize={pageSize}
              currentPage={page}
            />
          </Flex>
        </Card>

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
