"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowDownIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const MemberPagination
 = ({ itemCount, pageSize, currentPage }: Props) => {
  const pageCount = currentPage === 1 ? Math.ceil(itemCount / pageSize) : (Math.ceil(itemCount / pageSize) + 1)
  if (pageCount <= 1) return null;

  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("memberPage", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <Flex align="center" gap="2">
      <Button color="gray" variant="soft" disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}>
        <ChevronLeftIcon />
      </Button>
      <Text size="2">
        {currentPage} / {pageCount}
      </Text>
      <Button color="gray" variant="soft" disabled={currentPage === pageCount} onClick={() => changePage(currentPage + 1)}>
        <ChevronRightIcon />
      </Button>
    </Flex>
  );
};

export default MemberPagination
;
