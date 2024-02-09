import React, { ReactElement } from "react";
import RegisterForm from "./RegisterForm";
import { Card, Flex, Heading } from "@radix-ui/themes";
import { SiGhost } from "react-icons/si";


const RegisterPage = () => {
  return (
    <div className="flex flex-col justify-center ">
      <Flex direction="column" align="center" gap="3" className="mt-48" mb="3">
        <SiGhost size="50" />
      </Flex>
      <Flex direction="column" gap="3" align="center" justify="center" mt="9">
        <Heading mt="6">Create your account </Heading>

        <Card size="5" mt="5">
          <RegisterForm />
        </Card>
      </Flex>
    </div>
  );
};


export default RegisterPage;
