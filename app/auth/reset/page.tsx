

import { Flex, Heading, Card } from "@radix-ui/themes";
import { SiGhost } from "react-icons/si";
import ResetPasswordForm from "./ResetPasswordForm";
import { dynalight } from "@/app/layout";


const ResetPasswordPage = () => {
  return (
    <div className="flex flex-col justify-center ">
    <Flex direction="column"  align="center" gap="3" className="mt-48" mb="9">
    <SiGhost size="58" />
    <Heading size="9" className={dynalight.className}>Fix Flow</Heading>
     </Flex>

     <Flex direction="column" gap="3"  align="center" justify="center" mt="9">
    <text className="text-lg font-bold sm:text-xl">Reset your password </text>

    <Card size="5" mt="5" >      
    
        <ResetPasswordForm />
     </Card>
      
    </Flex>
    </div>
  );
};

export default ResetPasswordPage;
