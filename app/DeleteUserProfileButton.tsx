import { AlertDialog, Flex, Button } from '@radix-ui/themes'
import { Toaster } from 'react-hot-toast'
import { Spinner } from './components'
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import axios from 'axios';
import { setErrorMap } from 'zod';

const DeleteUserProfileButton = () => {
    const [isDeleting, setDeleting] = useState(false);
    const [isDeletingDone, setDeletingDone ] = useState(false);
    const [error, setError] = useState(false);

    const { data: session } = useSession();
    

    const deleteUserProfile  = async() => {
        try {
            setDeleting(true);
            const response = await axios.delete(`/api/users/${session?.user.id}`);
            if(response.status === 201) {
                setDeleting(false);
                setDeletingDone(true);
            }
            
        } catch(error) {
            setDeleting(false);
            setError(true);
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
          Are you sure you want to delete your profile? The action cannot be done.
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
              onClick={deleteUserProfile}
            >
             Delete
            </Button>
       
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>

    <AlertDialog.Root open={isDeletingDone}>
      <AlertDialog.Content>
        <AlertDialog.Title>Error</AlertDialog.Title>
        <AlertDialog.Description>
          Your profile has been removed.
        </AlertDialog.Description>
        <Flex justify="end">
          <Button
            color="gray"
            variant="soft"
            mt="3"
            onClick={() => signOut({callbackUrl:'/'})}
          >
            OK
          </Button>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>

    <AlertDialog.Root open={error}>
      <AlertDialog.Content>
        <AlertDialog.Title>Error</AlertDialog.Title>
        <AlertDialog.Description>
          Something went wrong. Your profiel cannot be deleted. 
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
  </>
  )
}

export default DeleteUserProfileButton
