import { Flex, Heading, Card, Box } from "@radix-ui/themes";
import React from "react";
import { SiGhost } from "react-icons/si";
import ForgotPasswordForm from "./ForgotPasswordForm";

const ForgetPasswordPage = () => {
  return (
    <div className="flex flex-col justify-center ">
      <Flex direction="column" align="center" gap="3" className="mt-48">
        <SiGhost size="50" />
      </Flex>
      <Flex direction="column" gap="3" align="center" justify="center" mt="9">
        <Heading mt="6">Reset your password </Heading>

        <Card size="5" mt="5">
          <ForgotPasswordForm />
        </Card>
      </Flex>
    </div>
  );
};

export default ForgetPasswordPage;
