'use client'
import { IssueStatusBadge } from "@/app/components";
import IssueSeverityBadge from "@/app/components/IssueSeverityBadge";
import { Issue } from "@prisma/client";
import {  Flex, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import IssueButtons from "../_components/IssueButtons";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowUpIcon } from "@radix-ui/react-icons";



const columns: { label: string; value: keyof Issue }[] = [
  { label: "Issue", value: "title" },
  { label: "Description", value: "description" },
  { label: "Status", value: "status" },
  { label: "Severity", value: "severity" },
];

export const columnNames = columns.map(column => column.value);

export interface IssueQuery {
  issueId: string;
  orderBy: keyof Issue;
  page: string;
  memberPage: string;

} 

const ProjectIssuesTable = ({searchParams, issuesOnEachPage}: {searchParams: IssueQuery, issuesOnEachPage: Issue[]}) => {
  const params = useParams();
const router = useRouter();
const searchParamsNavigation = useSearchParams();

const queryClient = useQueryClient();

const showIssueDetails = (issueId: number)=> {
  const queryParams = new URLSearchParams(searchParamsNavigation);

  queryParams.set('issueId', issueId.toString());
  router.push('?' + queryParams.toString());
  // queryClient.refetchQueries({ queryKey: ['comments'] });
  router.refresh()


};

  return (
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value}>
                <Flex>
                <NextLink href={{
                  query: {...searchParams, orderBy:column.value},
                }}>
                {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && ( <ArrowUpIcon className="inline" />)}
                </Flex>
              </Table.ColumnHeaderCell>
            ))}
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issuesOnEachPage?.map(projectIssue => 
            <Table.Row key={projectIssue.id} align="center">
            <Table.Cell><button className="text-left hover:text-stone-400" onClick={() => showIssueDetails(projectIssue.id)}>{projectIssue.title}</button></Table.Cell>
            <Table.Cell>{projectIssue.description.length > 40 ? projectIssue.description.substring(0,40) + "..." : projectIssue.description
            }</Table.Cell>
            <Table.Cell><IssueStatusBadge status={projectIssue.status}/></Table.Cell>
            <Table.Cell><IssueSeverityBadge severity={projectIssue.severity} /></Table.Cell>
            <Table.Cell><IssueButtons issue={projectIssue}/></Table.Cell>
 
          </Table.Row>)}
          
        </Table.Body>
      </Table.Root> 
    
   
  );
};

export default ProjectIssuesTable;
