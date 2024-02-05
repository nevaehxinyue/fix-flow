import { Box, Button, Flex, Grid } from "@radix-ui/themes";
import IssueChart from "./IssueChart";
import IssuesSummary from "./IssuesSummary";
import LatestIssues from "./LatestIssues";
import prisma from "@/prisma/client";

import { Metadata } from "next";
import ChangeUserNameMessage from "./ChangeUserNameMessage";
import { getServerSession } from "next-auth";
import authOptions from "./auth/authOptions";
import ProjectSummary from "./ProjectSummary";

export default async function Home() {
  const openIssueCount = await prisma.issue.count({
    where: { status: "OPEN" },
  });
  const inProgressIssueCount = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closedIssueCount = await prisma.issue.count({
    where: { status: "CLOSED" },
  });
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: { id: session?.user.id },
  });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      {!user?.name && user && (
        <div className="col-span-2">
          <ChangeUserNameMessage />
        </div>
      )}
      <Box className="col-span-2">
        <ProjectSummary />
      </Box>

      <Flex direction="column" gap="5">
        <IssuesSummary
          open={openIssueCount}
          inProgress={inProgressIssueCount}
          closed={closedIssueCount}
        />
        <IssueChart
          open={openIssueCount}
          inProgress={inProgressIssueCount}
          closed={closedIssueCount}
        />
      </Flex>
      <LatestIssues />
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
