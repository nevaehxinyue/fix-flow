import { Flex, Card } from "@radix-ui/themes"
import { Heading } from "@react-email/components"
import { SiGhost } from "react-icons/si"
import UsernameForm from "./UsernameForm"



const UserNameUpdatePage = () => {
  return (
    <div>
        <Flex direction="column" align="center" gap="3" mt="9" mb="6">
        <SiGhost size="50" />
      </Flex>
      <Flex direction="column" gap="3" align="center" justify="center" mt="9">
        <Heading mt="6">Set your username</Heading>

        <Card size="5" mt="5">
          <UsernameForm />
        </Card>
      </Flex>
      
    </div>
  )
}

export default UserNameUpdatePage
