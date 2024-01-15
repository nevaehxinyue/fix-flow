import prisma from "@/prisma/client";

import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const EditIssuePage = async ({ params }: { params: { id: string } }) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
  });

  return (
    <div>
      <IssueForm issue={issue} />
    </div>
  );
};

export default EditIssuePage;
