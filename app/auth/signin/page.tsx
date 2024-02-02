import EmailSigninForm from "@/app/auth/signin/EmailSigninForm";
import { SiGhost } from "react-icons/si";

import { Flex, Heading } from "@radix-ui/themes";


export default function SigninPage() {
  return (
   
    <Flex direction="column" gap="6"  align="center" justify="center" mt="9">
      <Flex direction="column"  align="center"  gap="3" mb="6">
     <SiGhost size="50" />
        
      </Flex>
      <Heading mt="3">Welcome back </Heading>
      <EmailSigninForm />
    </Flex>

  );
}
