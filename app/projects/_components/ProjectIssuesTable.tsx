import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Button, Table } from "@radix-ui/themes";


const columns: { label: string; value: keyof Issue }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status" },
  { label: "Creator", value: "createdByUserId" },
  { label: "Assignee", value: "assignedToUserId" },
];

const ProjectIssuesTable = () => {
  return (
    <Card>
      <Flex justify="between" mb="5">
        <Heading size="4">Issues</Heading>
        <Button>New Issues</Button>
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
          <Table.Row align="center">
            <Table.Cell>Issue 1</Table.Cell>
            <Table.Cell>Open</Table.Cell>
            <Table.Cell>Nevaeh</Table.Cell>
            <Table.Cell>Xin Yue</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root> 
    </Card>
  );
};

export default ProjectIssuesTable;
