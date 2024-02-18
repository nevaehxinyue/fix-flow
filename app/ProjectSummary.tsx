"use client";
import { Issue, ProjecOftUsers, ProjectStatus, User } from "@prisma/client";
import {
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
  assignedAt: Date;
}

interface ProjectType {
  id: number;
  title: string;
  description: string | null;
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
  createdByUserId: string;
  createdBy: User;
  assignedToUsers:assignedUserApi[] | null;
  issues: Issue[];
}

// interface ProjectApiResponse {
//   projects: ProjectType[];
// }

const ProjectSummary = () => {
  const {
    data: projects,
    error,
    isLoading,
  } = useQuery<ProjectType[]>({
    queryKey: ["projects"],
    queryFn: () =>
      axios.get<ProjectType[]>("/api/projects").then((res) => res.data),
    staleTime: 60 * 1000, //60s
    retry: 3,
    
  });

  // if (error) return null;

  //   console.log("projects type:", typeof projects);
  //   console.log("Is projects an array:", Array.isArray(projects));
    // console.log(projects);

  return (
    <div className="bg-white shadow-lg border-0 p-4 sm:p-8 w-[25rem] sm:w-auto rounded-lg">
      <Flex justify="between" align="center" className="border-b">
        <Heading size="4" mb="2">
          Projects
        </Heading>
        <ProjectButtons />
      </Flex>
      {/* {isLoading &&<Flex direction="column">
        <Skeleton height="2rem" />
        <Skeleton height="10rem" />
      </Flex>} */}
      {/* {!isLoading && */}
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
          {projects?.map((project) => (
            <Table.Row key={project.id}>
              <Table.Cell>
                <Link href={`/projects/${project.id}`}><Text size="3" className="font-semibold">{project.title}</Text></Link>
              </Table.Cell>
              <Table.Cell>{project.description}</Table.Cell>
              <Table.Cell>
                <ProjectStatusBadge status={project.status} />
              </Table.Cell>
              <Table.Cell>
                <Flex direction="column" gap="2">
                  <Text>{project.createdBy.name}</Text>
                  {project.assignedToUsers?.map((assignedUser) => (
                    <Text key={assignedUser.userId}>
                      {assignedUser.user.name}
                    </Text>
                  ))}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default ProjectSummary;
