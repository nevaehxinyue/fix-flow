import { Flex, Card, Box } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const LoadingIssueDetailPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex gap="3" my="3">
        <Skeleton width="3rem" />
        <Skeleton width="5rem" />
      </Flex>
      <Card className="prose">
       <Skeleton count={3}/>
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
