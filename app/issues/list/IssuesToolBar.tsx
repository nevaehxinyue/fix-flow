import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./IssueStatusFilter";

const IssuesToolBar = () => {
  return (
    <Flex justify="start">
      <IssueStatusFilter />
      </Flex>

  );
};

export default IssuesToolBar;
