import { Flex, Heading, Card, Box } from "@radix-ui/themes";
import React from "react";
import { SiGhost } from "react-icons/si";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { dynalight } from "@/app/layout";

const ForgetPasswordPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Flex direction="column" align="center" justify="center" gap="3" className="mt-48" mb="9">
        <SiGhost size="58" />
        <Heading size="9" className={dynalight.className}>Fix Flow</Heading>
      </Flex>
      <Flex direction="column" gap="3" align="center" justify="center" mt="9">
        <Heading mt="6" className="text-md sm:text-xl">Reset your password </Heading>

        <Card  mt="5" size="5" >
          <ForgotPasswordForm />
        </Card>
      </Flex>
    </div>
  );
};

export default ForgetPasswordPage;
