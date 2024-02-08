'use client'
import { Cross2Icon, DotsVerticalIcon } from "@radix-ui/react-icons"
import { Dialog, Flex } from "@radix-ui/themes"
import IssueForm from "@/app/projects/_components/IssueForm"
import { Issue } from "@prisma/client"
import { TbPencilBolt } from "react-icons/tb";
import { RiPencilFill } from "react-icons/ri";
import { HiOutlinePencil } from "react-icons/hi";



const IssueButtons = ({issue}: { issue?: Issue}) => {
    return (
    <Dialog.Root>
      <Dialog.Trigger>
        { issue ?  <button className=" hover:text-blue-500 hover:scale-125">
          <TbPencilBolt />
          {/* <RiPencilFill /> */}
      
          </button> : <button className="theme-button">New issue</button>}
        
      </Dialog.Trigger>
     
      <Dialog.Content className="max-w-md">
        <Flex justify="between" align="center">
          <Dialog.Title>
            { issue ? 'Edit issue':'New issue' }
          </Dialog.Title>
          <Dialog.Close>
            <button
              className="mb-5 h-6 w-6 flex items-center justify-center rounded-full border-2 hover:bg-stone-200"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Flex>
        <IssueForm issue={issue} />
      </Dialog.Content>
    </Dialog.Root>
    )

}

export default IssueButtons
