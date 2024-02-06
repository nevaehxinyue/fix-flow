import { Cross2Icon } from "@radix-ui/react-icons"
import { Button, Dialog, Flex } from "@radix-ui/themes"
import CreateIssueForm from "@/app/projects/_components/CreateIssueForm"



const NewIssueButton = () => {
    return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button >New issue</Button>
      </Dialog.Trigger>
     
      <Dialog.Content className="max-w-md">
        <Flex justify="between" align="center">
          <Dialog.Title>
            New issue
          </Dialog.Title>
          <Dialog.Close>
            <button
              className="mb-5 h-6 w-6 flex items-center justify-center rounded-full border-2 hover:bg-stone-200"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Flex>
        <CreateIssueForm />
      </Dialog.Content>
    </Dialog.Root>
    )

}

export default NewIssueButton
