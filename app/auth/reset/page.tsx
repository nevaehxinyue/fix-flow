

import { Flex, Heading, Card } from "@radix-ui/themes";
import { SiGhost } from "react-icons/si";
import ResetPasswordForm from "./ResetPasswordForm";


const ResetPasswordPage = () => {
  return (
    <div className="flex flex-col justify-center ">
    <Flex direction="column"  align="center" gap="3" className="mt-48" mb="6">
    <SiGhost size="50" />
     </Flex>
     <Flex direction="column" gap="3"  align="center" justify="center" mt="9">
    <Heading mt="6">Reset your password </Heading>

    <Card size="5" mt="5" >      
    
        <ResetPasswordForm />
     </Card>
      
    </Flex>
    </div>
  );
};

export default ResetPasswordPage;
