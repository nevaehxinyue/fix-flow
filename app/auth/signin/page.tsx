import EmailSigninForm from "@/app/auth/signin/EmailSigninForm";
import { SiGhost } from "react-icons/si";

import { Card, Flex, Grid, Heading, Separator, Text } from "@radix-ui/themes";
import PasswordSigninForm from "./PasswordSigninForm";
import { Link } from "@/app/components";
import GoogleSignin from "./GoogleSignin";

export default function SigninPage() {
  return (
    <>
      <Flex direction="column" align="center" gap="3" mt="9" mb="6">
        <SiGhost size="50" />
      </Flex>

      <Flex direction="column" gap="3" align="center" justify="center" mt="9">
        <Heading mt="6">Welcome back </Heading>

        <Card size="5" mt="5">
          <Grid columns={{ initial: "1", md: "3fr 0.2fr 3fr" }}>
          {/* // First column */}
          <Flex direction="column" gap="2" align="center">
          <PasswordSigninForm />
            <Text>
              Don't have an account? <Link href="/auth/register">Sign up</Link>
            </Text>
          </Flex>

        {/* //Second column */}
        <Separator className=" ml-6 mr-6" orientation="vertical" size="4" />

        {/* //Third column */}
          <Flex direction='column' gap="2" align="center" justify="center" className="w-full">

          <div className=" flex gap-3 justify-center items-center lg:hidden w-full">
          <Separator size="4" />
          <Text>or</Text>
          <Separator size="4" />
          </div>

          <GoogleSignin />
          <Flex  gap="3" align="center" className="w-full">
          <Separator size="4" />
          <Text>or</Text>
          <Separator size="4" />
          </Flex>
          <EmailSigninForm />
          </Flex>
          </Grid>
        </Card>
      </Flex>
    </>
  );
}
