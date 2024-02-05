"use client";
import { Issue, ProjectStatus, User } from "@prisma/client";
import {
  Button,
  Card,
  Flex,
  Heading,
  Table,
  TableColumnHeaderCell,
  Text,
} from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { Link } from "./components";


import ProjectButtons from "./projects/_components/ProjectButtons";
import ProjectStatusBadge from "./projects/_components/ProjectStatusBadge";

//Set up the data type of returned projects
interface assignedUserApi {
  projectId: number;
  user: User;
  userId: string;
}

interface ProjectType {
  id: number;
  title: string;
  description: string;
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
  createdByUserId: string;
  createdBy: User;
  assignedToUsers: assignedUserApi[];
  issues: Issue[];
}

interface ProjectApiResponse {
  projects: ProjectType[];
}

const ProjectSummary = () => {
  const {
    data: projects,
    error,
    isLoading,
  } = useQuery<ProjectApiResponse>({
    queryKey: ["projects"],
    queryFn: () =>
      axios.get<ProjectApiResponse>("/api/projects").then((res) => res.data),
    staleTime: 60 * 1000, //60s
    retry: 3,
    
  });

  if (error) return null;
  if (isLoading) {
    return (
      <Flex direction="column">
        <Skeleton height="2rem" />
        <Skeleton height="5rem" />
      </Flex>
    );
  }

  //   console.log("projects type:", typeof projects);
  //   console.log("Is projects an array:", Array.isArray(projects));
  //   console.log({ projects });

  return (
    <Card>
      <Flex justify="between" className="border-b ">
        <Heading size="4" mb="5">
          Projects
        </Heading>
        <ProjectButtons />
      </Flex>

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <TableColumnHeaderCell>Project</TableColumnHeaderCell>
            <TableColumnHeaderCell>Description</TableColumnHeaderCell>
            <TableColumnHeaderCell>Status</TableColumnHeaderCell>
            <TableColumnHeaderCell>Contributors</TableColumnHeaderCell>
            <TableColumnHeaderCell></TableColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {projects?.projects.map((project) => (
            <Table.Row key={project.id}>
              <Table.Cell>
                <Link href={`/projects/${project.id}`}>{project.title}</Link>
              </Table.Cell>
              <Table.Cell>{project.description}</Table.Cell>
              <Table.Cell>
                <ProjectStatusBadge status={project.status} />
              </Table.Cell>
              <Table.Cell>
                <Flex direction="column" gap="2">
                  <Text>{project.createdBy.name}</Text>
                  {project.assignedToUsers.map((assignedUser) => (
                    <Text key={assignedUser.user.id}>
                      {assignedUser.user.name}
                    </Text>
                  ))}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default ProjectSummary;
