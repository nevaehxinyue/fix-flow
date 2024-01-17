import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueFilterSelector from "./IssueFilterSelector";

const IssuesToolBar = () => {
  return (
    <Flex mb="3" justify="between">
      <IssueFilterSelector />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssuesToolBar;
