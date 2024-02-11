'use client'
import { Spinner } from '@/app/components'
import { Issue } from '@prisma/client'
import { AlertDialog, Flex, Button} from '@radix-ui/themes'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'

const DeleteIssueButton = ({issue}: {issue: Issue}) => {
    const [error, setError] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const router = useRouter();
   const params = useParams()


    const deleteIssue = async() => {
        try {
            setDeleting(true);
            await axios.delete(`/api/issues/${issue.id}`);
            router.push(`/projects/${params.id}`);
        }catch(error){
            setError(true)
        }
    }
  return (
    <>
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button size="1" color="red" variant='soft' disabled={isDeleting}>
            Yes {isDeleting && <Spinner />}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Note</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue? The action cannot be done.
        </AlertDialog.Description>

        <Flex mt="8" gap="3" justify="end">
          <AlertDialog.Cancel>
            <Button color="gray" variant="soft">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              color="red"
              variant="solid"
              onClick={deleteIssue}
            >
             Delete
            </Button>
       
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>

    <AlertDialog.Root open={error}>
      <AlertDialog.Content>
        <AlertDialog.Title>Error</AlertDialog.Title>
        <AlertDialog.Description>
          This issue cannot be removed.
        </AlertDialog.Description>
        <Flex justify="end">
          <Button
            color="gray"
            variant="soft"
            mt="3"
            onClick={() => setError(false)}
          >
            OK
          </Button>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
    <Toaster />
  </>
  )
}

export default DeleteIssueButton
