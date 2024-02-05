'use client'
import { Button, Dialog } from '@radix-ui/themes'


const AddMemberButton = () => {
  return (
    <Dialog.Root>
        <Dialog.Trigger>
            <Button>New Member</Button>
        </Dialog.Trigger>
        <Dialog.Content>
            <Dialog.Title>Add a new member</Dialog.Title>

        </Dialog.Content>
    </Dialog.Root>
  )
}

export default AddMemberButton
