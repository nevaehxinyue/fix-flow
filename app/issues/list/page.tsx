import prisma from "@/prisma/client";
import IssuesToolBar from "./IssuesToolBar";
import { Issue, Status } from "@prisma/client";
import Pagination from "@/app/components/Pagination";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

const IssuePage = async ({ searchParams }: { searchParams: IssueQuery }) => {
  //Validate the query parameter for status and orderBy, if unvalid, return all issues
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "desc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: {
      status,
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
    },
  });

  return (
    <Flex gap="3" direction="column">
      <IssuesToolBar />
      <IssueTable searchParams={searchParams} issues={issues}/>
      <Flex justify="center">
      <Pagination
        itemCount={issueCount}
        currentPage={page}
        pageSize={pageSize}
      />
      </Flex>
    </Flex>
  );
};

export const dynamic = "force-dynamic";
// export const revalidate = 0;

export default IssuePage;
