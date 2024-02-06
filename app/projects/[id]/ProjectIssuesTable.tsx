'use client'
import { IssueStatusBadge, Skeleton } from "@/app/components";
import IssueSeverityBadge from "@/app/components/IssueSeverityBadge";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Button, Table } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import IssueEditAndRemoveMenu from "./IssueEditAndRemoveMenu";
import NewIssueButton from "./NewIssueButton";
// import NewIssueButton from "./NewIssueButton";

const columns: { label: string; value: keyof Issue }[] = [
  { label: "Issue", value: "title" },
  { label: "Description", value: "description" },
  { label: "Status", value: "status" },
  { label: "Severity", value: "severity" },
];

const ProjectIssuesTable = ({issuesOnEachPage}: {issuesOnEachPage: Issue[]}) => {
  const params = useParams();
  // const projectId = params.id;


  // const { data: projectIssues, error, isLoading } = useQuery<Issue[]>({
  //   queryKey: ['projectIssues'],
  //   queryFn: ()=> axios.get<Issue[]>(`/api/projects/${projectId}/issues`).then(res => res.data),
  //   staleTime: 7 * 24 * 60 * 60 * 1000, //7 days
  //   retry: 3,
  // })

  // console.log(projectIssues)

  // if (error) return null;
  // if (isLoading) {
  //   return (
  //     <Flex direction="column">
  //       <Skeleton height="2rem" />
  //       <Skeleton height="2rem" />
  //       <Skeleton height="2rem" />
  //       <Skeleton height="2rem" />
  //     </Flex>
  //   );
  // }

  return (
    <Flex direction="column">
   
      <Flex justify="between" mb="5">
        <Heading size="4">Issues</Heading>
        <NewIssueButton />
      </Flex>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value}>
                {column.label}
              </Table.ColumnHeaderCell>
            ))}
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issuesOnEachPage?.map(projectIssue => 
            <Table.Row key={projectIssue.id} align="center">
            <Table.Cell>{projectIssue.title}</Table.Cell>
            <Table.Cell>{projectIssue.description.length > 40 ? projectIssue.description.substring(0,40) + "..." : projectIssue.description
            }</Table.Cell>
            <Table.Cell><IssueStatusBadge status={projectIssue.status}/></Table.Cell>
            <Table.Cell><IssueSeverityBadge severity={projectIssue.severity} /></Table.Cell>
            <Table.Cell><IssueEditAndRemoveMenu/></Table.Cell>
 
          </Table.Row>)}
          
        </Table.Body>
      </Table.Root> 
      </Flex>
   
  );
};

export default ProjectIssuesTable;
