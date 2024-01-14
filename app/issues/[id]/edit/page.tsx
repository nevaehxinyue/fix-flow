import prisma from "@/prisma/client"
import IssueForm from '../../_components/IssueForm'
import { notFound } from "next/navigation"

const EditIssuePage = async ({ params }: { params: {id: string}}) => {
    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    })

    if (!issue)
        notFound(); 

  return (
    <div>
      <IssueForm issue={issue}/>
    </div>
  )
}

export default EditIssuePage
