import { Flex, Heading, Text } from "@radix-ui/themes"
import EditProfileSingleForm from "../EditProfileSingleForm"

const UserEditProfilePage = () => {
  return (
    <div className="flex flex-col justify-center">
    <Flex direction="column" align="center" className="mt-48" gap="6">  
    <Heading className="">Edit Profile</Heading>
    <EditProfileSingleForm />
    </Flex>
    </div>
  )
}

export default UserEditProfilePage
