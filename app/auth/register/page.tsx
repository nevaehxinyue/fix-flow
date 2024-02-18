import React, { ReactElement } from "react";
import RegisterForm from "./RegisterForm";
import { Card, Flex, Heading } from "@radix-ui/themes";
import { SiGhost } from "react-icons/si";
import { dynalight } from "@/app/layout";


const RegisterPage = () => {
  return (
    <div className="flex flex-col justify-center h-auto ">
      <Flex direction="column" align="center" gap="3" className="mt-48" mb="9">
        <SiGhost size="58" />
        <Heading size="9"  className={dynalight.className}>Fix Flow</Heading>
      </Flex>
      <Flex direction="column" gap="3" align="center" justify="center" mt="9">
      <text className="text-xl font-bold sm:text-2xl">Create your account </text>

        <Card size="5" mt="5">
          <RegisterForm />
        </Card>
      </Flex>
    </div>
  );
};


export default RegisterPage;
