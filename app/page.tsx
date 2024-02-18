import { Box, Flex, Grid } from "@radix-ui/themes";
import LatestIssues from "./LatestIssues";
import prisma from "@/prisma/client";

import { Metadata } from "next";
import ChangeUserNameMessage from "./ChangeUserNameMessage";
import { getServerSession } from "next-auth";
import authOptions from "./auth/authOptions";
import ProjectSummary from "./ProjectSummary";
import IssueSeveritySummary from "./IssueSeveritySummary";
import IssueStatusSummary from "./IssueStatusSummary";

import dynamic from "next/dynamic";
import { setEngine } from "crypto";

const DynamicIssueSeverityChart = dynamic(
  () => import("./IssueSeverityChart"),
  { ssr: false }
);
const DynamicIssueStatusChart = dynamic(() => import("./IssueStatusChart"), {
  ssr: false,
});

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: { id: session?.user.id },
  });

  const latestIssues = await prisma.issue.findMany({
    where: {
      OR: [
        { createdByUserId: session?.user.id },
        { assignedToUserId: session?.user.id },
      ],
    },
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  const openIssueCount = await prisma.issue.count({
    where: {
      status: "OPEN",
      OR: [
        { createdByUserId: session?.user.id },
        { assignedToUserId: session?.user.id },
      ],
    },
  });

  const inProgressIssueCount = await prisma.issue.count({
    where: {
      status: "IN_PROGRESS",
      OR: [
        { createdByUserId: session?.user.id },
        { assignedToUserId: session?.user.id },
      ],
    },
  });

  const closedIssueCount = await prisma.issue.count({
    where: {
      status: "CLOSED",
      OR: [
        { createdByUserId: session?.user.id },
        { assignedToUserId: session?.user.id },
      ],
    },
  });

  const minorIssueCount = await prisma.issue.count({
    where: {
      severity: "MINOR",
      OR: [
        { createdByUserId: session?.user.id },
        { assignedToUserId: session?.user.id },
      ],
    },
  });

  const mediumIssueCount = await prisma.issue.count({
    where: {
      severity: "MEDIUM",
      OR: [
        { createdByUserId: session?.user.id },
        { assignedToUserId: session?.user.id },
      ],
    },
  });

  const majorIssueCount = await prisma.issue.count({
    where: {
      severity: "MAJOR",
      OR: [
        { createdByUserId: session?.user.id },
        { assignedToUserId: session?.user.id },
      ],
    },
  });

  const criticalIssueCount = await prisma.issue.count({
    where: {
      severity: "CRITICAL",
      OR: [
        { createdByUserId: session?.user.id },
        { assignedToUserId: session?.user.id },
      ],
    },
  });

  return (
    <Flex direction="column" align="center" justify="center">
      <Grid
        columns={{ initial: "1", md: "1fr 1fr", xl: "1fr 1fr 1fr" }}
        gap="8"
      >
        {!user?.name && user && (
          <div className="col-span-3">
            <ChangeUserNameMessage />
          </div>
        )}

        <Box className="lg:col-span-2 2xl:col-span-3 flex justify-center sm:block ">
          <ProjectSummary />
        </Box>

        <Box className="col-span-1 lg:col-span-1 flex justify-center sm:block ">
          <Flex
            direction="column"
            justify="center"
            align="center"
            gap="5"
            className=" bg-white shadow-lg border-0 p-4 sm:p-8 w-[28rem] sm:w-auto rounded-lg"
          >
            <IssueStatusSummary
              open={openIssueCount}
              inProgress={inProgressIssueCount}
              closed={closedIssueCount}
            />
            <DynamicIssueStatusChart
              open={openIssueCount}
              inProgress={inProgressIssueCount}
              closed={closedIssueCount}
            />
          </Flex>
        </Box>

        <Box className="col-span-1 lg:col-span-1 flex justify-center sm:block ">
        <Flex
          direction="column"
          justify="center"
          align="center"
          gap="5"
          className="bg-white shadow-lg border-0 p-4 sm:p-8 rounded-lg w-[25rem] sm:w-auto"
        >
          <IssueSeveritySummary
            minor={minorIssueCount}
            medium={mediumIssueCount}
            major={majorIssueCount}
            critical={criticalIssueCount}
          />
          <DynamicIssueSeverityChart
            minor={minorIssueCount}
            medium={mediumIssueCount}
            major={majorIssueCount}
            critical={criticalIssueCount}
          />
        </Flex>
        </Box>

        <Box className="col-span-1 lg:col-span-2 2xl:col-span-1 w-[22rem] sm:w-auto ml-[-3.5rem] sm:ml-0  ">
        <Flex direction="column" className=" bg-white shadow-lg border-0 p-4 sm:p-8 rounded-lg ">
        <LatestIssues latestIssues={latestIssues} />
        </Flex>
        </Box>
      

      </Grid>
    </Flex>
  );
}
// export async function getServerSideProps(context) {
//   const session = await getServerSession(context, authOptions);

// }

export const metadata: Metadata = {
  title: "Fix Flow - Dashboard",
  description: "View a summary of project issues",
};
