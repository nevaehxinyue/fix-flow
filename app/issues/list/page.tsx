import prisma from "@/prisma/client";
import IssuesToolBar from "./IssuesToolBar";
import { Status } from "@prisma/client";
import Pagination from "@/app/components/Pagination";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
import { Flex, Text } from "@radix-ui/themes";
import { title } from "process";
import { GetServerSidePropsContext, Metadata } from "next";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { redirect } from "next/dist/server/api-utils";

const IssuePage = async ({ searchParams }: { searchParams: IssueQuery }) => {
  //Validate the query parameter for status and orderBy, if unvalid, return all issues
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const session = await getServerSession(authOptions);
  console.log(session)
  const issues = await prisma.issue.findMany({
    where: {
      status,
      OR: [
        {createdByUserId: session?.user.id},
        {assignedToUserId: session?.user.id}
      ]
    },
    //specify how the returned records should be sorted.
    orderBy,
    //ensure with the query will get issues of the given page.
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where: {
      status,
      OR: [
        {createdByUserId: session?.user.id},
        {assignedToUserId: session?.user.id}
      ]
    },
  });

  if(issues.length === 0) {
    return (
      <div className="flex mt-72 justify-center">
    <Text className="font-semibold mt-48 text-lg">No issue yet</Text></div>)
  }

  return (
    <div className="flex flex-col gap-10 p-8 bg-white border-0 rounded-lg shadow-lg">
      <IssuesToolBar />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Flex justify="center">
        <Pagination
          itemCount={issueCount}
          currentPage={page}
          pageSize={pageSize}
        />
      </Flex>
    </div>
  );
};

export const dynamic = "force-dynamic";


export default IssuePage;


export const metadata: Metadata = {
  title: "Fix Flow -  List ",
  description: "A List of all issues belonging to the current user",
};
