import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import React from "react";
import ProjectButtons from "./projects/_components/ProjectButtons";
import { Skeleton } from "./components";

const HomeLoadingPage = () => {
  const containers1: { label: string }[] = [
    { label: "Open Issues" },
    { label: "In Progress Issues" },
    { label: "Closed Issues" },
  ];
  const containers2: { label: string }[] = [
    { label: "Minor Issues" },
    { label: "Medium Issues" },
    { label: "Major Issues" },
    { label: "Critical Issues" },
  ];

  return (
    <Grid columns={{ initial: "1", lg: "1fr 1fr 1fr" }} gap="8">
      <Box className="col-span-3">
        <div className="bg-white shadow-lg border-0 p-8 rounded-lg">
          <Flex justify="between" align="center" className="border-b ">
            <Heading size="4" mb="5">
              Projects
            </Heading>
            <ProjectButtons />
          </Flex>
          <Skeleton height="2rem" />
          <Skeleton height="10rem" />
        </div>
      </Box>

      <Flex
        direction="column"
        justify="center"
        align="center"
        gap="5"
        className="bg-white shadow-lg border-0 p-8 rounded-lg col-span-3 xl:col-span-1 "
      >
        <Flex gap="2">
          {containers1.map((container) => (
            <Card key={container.label}>
              <Flex direction="column" gap="1">
                <Text>{container.label}</Text>
                <Skeleton />
              </Flex>
            </Card>
          ))}
        </Flex>

        <Box className="w-96 shadow-lg border-0">
          <Heading ml="3" size="4">
            Issues by status
          </Heading>
          <Box className="p-8">
            <Skeleton height="12rem" />
          </Box>
        </Box>
      </Flex>

      <Flex
        direction="column"
        justify="center"
        align="center"
        gap="5"
        className="bg-white shadow-lg border-0 p-8 rounded-lg col-span-3 xl:col-span-1 "
      >
        <Flex gap="2">
          {containers2.map((container) => (
            <Card key={container.label}>
              <Flex direction="column" gap="1">
                <Text>{container.label}</Text>
                <Skeleton />
              </Flex>
            </Card>
          ))}
        </Flex>

        <Box className="w-96 shadow-lg border-0">
          <Heading ml="3" size="4">
            Issues by severity
          </Heading>
          <Box className="p-8">
            <Skeleton height="12rem" />
          </Box>
        </Box>
      </Flex>

      <Box className="shadow-lg border-0 p-5 bg-white rounded-lg col-span-3 xl:col-span-1">
      <Heading size="4" mb="5">
        Latest Issues
      </Heading>
      <Skeleton height='3rem'/>
      <Skeleton height='3rem'/>
      <Skeleton height='3rem'/>
      <Skeleton height='3rem'/>
      <Skeleton height='3rem'/>
      </Box>
    </Grid>
  );
};

export default HomeLoadingPage;
