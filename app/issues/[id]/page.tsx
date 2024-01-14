import ReactMarkdown from "react-markdown"
import prisma  from "@/prisma/client"
import { notFound } from 'next/navigation'
import { Card, Flex, Heading } from '@radix-ui/themes'
import { IssueStatusBadge } from  '@/app/components'


const IssueDetailPage = async ({ params }: {params: { id: string}}) => {
    const issue = await prisma.issue.findUnique( {
        where: {id: parseInt(params.id)}
    })

    if (!issue) 
        notFound();
  return (
    <div>
      <Heading>{issue?.title}</Heading>
      <Flex gap="3" my="3">
      <IssueStatusBadge status={issue.status}/>
      <p>{issue?.createdAt.toDateString()}</p>
      </Flex>
      <Card className="prose"><ReactMarkdown>{issue?.description}</ReactMarkdown></Card>
      
      
    </div>
  )
}

export default IssueDetailPage
