import EmailSigninForm from "@/app/auth/signin/EmailSigninForm";
import { SiGhost } from "react-icons/si";
import { Card, Flex, Grid, Heading, Separator, Text } from "@radix-ui/themes";
import PasswordSigninForm from "./PasswordSigninForm";

import GoogleSignin from "./GoogleSignin";

import { dynalight } from "@/app/layout";
import Link from "next/link";

const SigninPage = () => {
  return (
    <div className="flex flex-col justify-center h-auto ">
      <Flex direction="column" align="center" gap="3" className="mt-48" mb="9">
        <SiGhost size="58" />
        <Heading size="9"  className={dynalight.className}>Fix Flow</Heading>
      </Flex>

      <Flex direction="column" gap="3" align="center" justify="center" mt="9">
        <Heading mt="6" size="7">Welcome back </Heading>

        <Card size="5" mt="5" className="w-[20rem] sm:w-[50rem]">
          <Grid columns={{ initial: "1", md: "3fr 0.2fr 3fr" }}>
            {/* // First column */}
         
            <PasswordSigninForm />
            
   
           

            {/* //Second column */}
            <Separator className=" ml-6 mr-6" orientation="vertical" size="4" />

            {/* //Third column */}
            <Flex
              direction="column"
              gap="2"
              align="center"
              justify="center"
              className="w-full"
            >
              <div className=" flex gap-3 justify-center items-center lg:hidden w-full">
                <Separator size="4" />
                <Text>or</Text>
                <Separator size="4" />
              </div>

              <GoogleSignin />
              <Flex gap="3" align="center" className="w-full">
                <Separator size="4" />
                <Text>or</Text>
                <Separator size="4" />
              </Flex>
              <EmailSigninForm />
            </Flex>
          </Grid>
        </Card>
      </Flex>
    </div>
  );
};

export default SigninPage;
