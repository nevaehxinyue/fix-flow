import { Flex, Heading, Text } from "@radix-ui/themes"
import EditProfileSingleForm from "../EditProfileSingleForm"
import { Metadata } from "next"

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

export const metadata: Metadata = {
  title: "Fix Flow - Edit profile",
  description: "Edit user profie",
};
