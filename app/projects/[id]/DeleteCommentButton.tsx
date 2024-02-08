import { ErrorMessage, Spinner } from '@/app/components'
import { AlertDialog, Flex, Button, Text } from '@radix-ui/themes'
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";

const DeleteCommentButton = ({commentId}: {commentId: number}) => {
    const [error, setError] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const queryClient = useQueryClient();

    const deleteComment = async () => {
        try{
            setDeleting(true)
            await axios.delete(`/api/comments/${commentId}`)
            queryClient.refetchQueries({queryKey: ['comments']});
            setDeleting(false);
        }catch(error) {
            setError(true);
        }
    }

  return (
    <>
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <div className='text-lg hover:text-red-500 hover:scale-110 '>
        <MdDeleteOutline  />
        </div>
        
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Note</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this comment? The action cannot be done.
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
              onClick={deleteComment}
              disabled={isDeleting}
            >
             Delete {isDeleting && <Spinner />}
            </Button>
    
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
    <AlertDialog.Root open={error}>
      <AlertDialog.Content>
        <AlertDialog.Title>Error</AlertDialog.Title>
        <AlertDialog.Description>
          This comment cannot be deleted.
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

export default DeleteCommentButton
