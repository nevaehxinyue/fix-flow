import { Box, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { cache } from "react";
import ProjectMemberTable from "./ProjectMemberTable";
import ProjectIssuesTable, { IssueQuery } from "./ProjectIssuesTable";
import IssueDetails from "./IssueDetails";
import prisma from "@/prisma/client";
import AddMemberButton from "./AddMemberButton";
import CommentDetails from "./CommentDetails";
import ProjectButtons from "../_components/ProjectButtons";
import { ProjecOftUsers, User } from "@prisma/client";
import Pagination from "@/app/components/Pagination";
import MemberPagination from "@/app/components/MemberPagination";
import IssueButtons from "../_components/IssueButtons";
import IssueCommentForm from "./IssueCommentForm";
import ProjectDescriptionDialog from "./ProjectDescriptionDialog";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const DynamicIssueDetails = dynamic(() => import("./IssueDetails"), {
  ssr: false,
});

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
  searchParams: IssueQuery;
  params: { id: string };
}) => {
  const projectId = parseInt(params.id);
  const project = await fetchProject(projectId);

  const creator = project!.createdBy;
  const assignedUsers = project?.assignedToUsers
    ? project?.assignedToUsers.map((assignment) => assignment.user)
    : [];

  const allMembers = [creator, ...assignedUsers];
  const membersIds = allMembers.map((member) => member.id);
  const allUsers = await prisma.user.findMany();
  const projectAvailableAssginees = allUsers.filter(
    (user) => !membersIds.includes(user.id)
  );

  //Fetch members on each page
  const memberPageSize = 3;
  const memberPage = parseInt(searchParams.memberPage) || 1;
  const memberCount =
    (await prisma.projecOftUsers.count({
      where: { projectId: projectId },
    })) + (memberPage === 1 ? 1 : 0);

  const memberSkip =
    memberPage === 1 ? 0 : (memberPage - 1) * memberPageSize - 1;
  const memberTake = memberPage === 1 ? memberPageSize - 1 : memberPageSize;

  const membersOnEachPage = (
    await prisma.projecOftUsers.findMany({
      where: {
        projectId: projectId,
      },
      include: {
        user: true,
      },
      skip: memberSkip,
      take: memberTake,
    })
  ).map((object) => object.user);

  //Fetch issues on each page
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 3;
  //Sort issues by orderBy
  const orderBy = searchParams.orderBy
    ? { [searchParams.orderBy]: "asc" }
    : undefined;
  // columnNames.includes(searchParams.orderBy) ? { [searchParams.orderBy]:'desc'} : undefined;
  const issuesOnEachPage = await prisma.issue.findMany({
    where: { projectId: projectId },
    orderBy: orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issuesCount = await prisma.issue.count({
    where: { projectId: projectId },
  });

  let requestedIssue;
  if (searchParams.issueId) {
    requestedIssue = await prisma.issue.findUnique({
      where: { id: parseInt(searchParams.issueId) },
      include: {
        assignedToUser: true,
        createdBy: true,
      },
    });
  }

  return (
    <Flex
      direction="column"
      gap="8"
      className="mt-[-3rem] ml-[-3rem] w-[20rem] sm:w-auto xl:mt-0"
    >
      {/* // <Flex direction="column" className="bg-white shadow-lg border-0 p-5 rounded-lg"> */}
      <Flex direction="column" gap="5" mb="2">
        <Heading className="text-white">Project</Heading>
        <Flex justify="between" mb="8">
          <Heading className="text-white" size="5">
            {project?.title}
          </Heading>
          <ProjectDescriptionDialog
            projectTitle={project?.title}
            projectDescription={project?.description}
          />
          <ProjectButtons project={project} />
        </Flex>
      </Flex>

      <Grid columns={{ initial: "1", lg: "1.5fr 1.5fr 1.5fr" }} gap="8">
        <Box className="bg-white rounded-lg shadow-lg border-0 col-span-1 p-5 relative w-[18rem] sm:w-auto">
          <Flex justify="between" mb="4" className="relative">
            <Heading size="4">Team</Heading>
            <AddMemberButton projectAssginees={projectAvailableAssginees} />
          </Flex>

          <ProjectMemberTable
            members={membersOnEachPage}
            creator={creator}
            currentPage={memberPage}
          />

          <Flex
            mt="4"
            justify="center"
            className="relative xl:absolute inset-x-0 pb-2 bottom-0 "
          >
            <MemberPagination
              itemCount={memberCount}
              pageSize={pageSize}
              currentPage={memberPage}
            />
          </Flex>
        </Box>

        <Box className="bg-white rounded-lg shadow-lg col-span-2 space-y-2 relative border-0 p-5">
          <Flex direction="column" className="lg:mb-10">
            <Flex justify="between" mb="4">
              <Heading size="4">Issues</Heading>
              <IssueButtons />
            </Flex>

            <ProjectIssuesTable
              searchParams={searchParams}
              issuesOnEachPage={issuesOnEachPage}
            />
          </Flex>
          <Flex
            mt="3"
            justify="center"
            className="relative lg:absolute inset-x-0 pb-2 bottom-0 mt-2 "
          >
            <Pagination
              itemCount={issuesCount}
              pageSize={pageSize}
              currentPage={page}
            />
          </Flex>
        </Box>
      </Grid>


        <Box className="bg-white rounded-lg shadow-lg border-0 p-5 w-[22rem] left-[-6rem] sm:w-auto">
          <Heading className="border-b pb-5" mb="5" mt="3" size="4">
            Selected Issue Info
          </Heading>

          {searchParams.issueId && (
            <Grid columns={{ initial: "1", md: "1.25fr 1.25fr 1.5fr" }} gap="5">
              <div className="col-span-2 bg-white rounded-lg shadow-lg border-0 p-5">
                <DynamicIssueDetails issue={requestedIssue} />
              </div>
              <Box className="space-y-5 bg-white rounded-lg shadow-lg border-0 p-5">
                <Heading className="border-b pb-4" size="4">
                  Comments
                </Heading>
                <CommentDetails issueId={searchParams.issueId} />
                <IssueCommentForm issueId={searchParams.issueId} />
                {/* <IssueComments issueId={searchParams.issueId} /> */}
              </Box>
            </Grid>
          )}
        </Box>

      {/* // </Flex> */}
    </Flex>
  );
};

export default ProjectDetialPage;

export const metadata: Metadata = {
  title: "Fix Flow - Project Page",
  description: "View details of a project",
};
