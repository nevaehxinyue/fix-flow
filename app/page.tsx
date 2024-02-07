import { Box, Button, Flex, Grid } from "@radix-ui/themes";
import IssueStatusChart from "./IssueStatusChart";
import LatestIssues from "./LatestIssues";
import prisma from "@/prisma/client";

import { Metadata } from "next";
import ChangeUserNameMessage from "./ChangeUserNameMessage";
import { getServerSession } from "next-auth";
import authOptions from "./auth/authOptions";
import ProjectSummary from "./ProjectSummary";
import IssueSeveritySummary from "./IssueSeveritySummary";
import IssueStatusSummary from "./IssueStatusSummary";


export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: { id: session?.user.id },
  });

  const openIssueCount = await prisma.issue.count({
    where: { status: 'OPEN',
    OR: [
      {createdByUserId: session?.user.id}, {assignedToUserId: session?.user.id}
    ]}
  });

  const inProgressIssueCount = await prisma.issue.count({
    where: { status: 'IN_PROGRESS',
    OR: [
      {createdByUserId: session?.user.id}, {assignedToUserId: session?.user.id}
    ]}
  });

  const closedIssueCount = await prisma.issue.count({
    where: { status:'CLOSED',
    OR: [
      {createdByUserId: session?.user.id}, {assignedToUserId: session?.user.id}
    ]}
  });

  const minorIssueCount = await prisma.issue.count({
    where: { severity:'MINOR',
    OR: [
      {createdByUserId: session?.user.id}, {assignedToUserId: session?.user.id}
    ]},
  });

  const mediumIssueCount = await prisma.issue.count({
    where: { severity:"MEDIUM",
    OR: [
      {createdByUserId: session?.user.id}, {assignedToUserId: session?.user.id}
    ]},
  });

  const majorIssueCount = await prisma.issue.count({
    where: { severity:'MAJOR',
    OR: [
      {createdByUserId: session?.user.id}, {assignedToUserId: session?.user.id}
    ]},
  });

  const criticalIssueCount = await prisma.issue.count({
    where: { severity:'CRITICAL',
    OR: [
      {createdByUserId: session?.user.id}, {assignedToUserId: session?.user.id}
    ]},
  });

  

  return (
    <Grid columns={{ initial: "1", md: "2fr 1fr" }} gap="9">
      {!user?.name && user && (
        <div className="col-span-2">
          <ChangeUserNameMessage />
        </div>
      )}
      <Box className="col-span-2">
        <ProjectSummary />
      </Box>
  
      <Flex direction="column" gap="5" mb="5">
        <Flex className="gap-x-24">
        <IssueStatusSummary
          open={openIssueCount}
          inProgress={inProgressIssueCount}
          closed={closedIssueCount}
        />
        <IssueSeveritySummary 
          minor={minorIssueCount}
          medium={mediumIssueCount}
          major={majorIssueCount}
          critical={criticalIssueCount}/>
          </Flex>

        <IssueStatusChart
          open={openIssueCount}
          inProgress={inProgressIssueCount}
          closed={closedIssueCount}
          minor={minorIssueCount}
         medium={mediumIssueCount}
         major={majorIssueCount}
         critical={criticalIssueCount}
        />
    </Flex>
 
    <Box className="shadow-lg border-0">
      <LatestIssues />
      </Box>
    </Grid>
  );
}
// export async function getServerSideProps(context) {
//   const session = await getServerSession(context, authOptions);

// }

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};
