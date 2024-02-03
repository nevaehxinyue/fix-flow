import EmailSigninForm from "@/app/auth/signin/EmailSigninForm";
import { SiGhost } from "react-icons/si";

import { Card, Flex, Heading, Separator, Text } from "@radix-ui/themes";
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
          <PasswordSigninForm />
          <Flex direction="column" gap="2" align="center">
            <Text>
              Don't have an account? <Link href="/auth/register">Sign up</Link>
            </Text>

            <Flex gap="3" align="center" className="w-full">
              <Separator size="4" />
              <Text>or</Text>
              <Separator size="4" />
            </Flex>
          </Flex>
          <EmailSigninForm />
          <Flex gap="3" align="center" className="w-full">
            <Separator size="4" />
            <Text>or</Text>
            <Separator size="4" />
          </Flex>
          <GoogleSignin />
        </Card>
      </Flex>
    </>
  );
}
