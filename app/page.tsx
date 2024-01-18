
import IssuesSummary from './IssuesSummary'
import LatestIssues from './LatestIssues'
import prisma from '@/prisma/client'
export default async function Home () {

  const openIssueCount = await prisma.issue.count({
    where: {status: 'OPEN'}
  });
  const inProgressIssueCount = await prisma.issue.count({
    where: {status: 'IN_PROGRESS'}
  });
  const closedIssueCount = await prisma.issue.count({
    where: {status: 'CLOSED'}
  });

  return (
    <>
   <LatestIssues />
   <IssuesSummary open={openIssueCount} inProgress={inProgressIssueCount} closed={closedIssueCount}/>
   </>
   )
}
