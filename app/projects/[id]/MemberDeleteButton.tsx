'use client'
import { Spinner } from '@/app/components';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const MemberDeleteButton = ({memberId}: {memberId: string}) => {


    const [error, setError] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const params = useParams();
    const router = useRouter();

    const removeMembers = async() => {
        try {
            setDeleting(true);
            const response = await axios.delete(`/api/projects/${params.id}/members/${memberId}` );
            if(response.status = 201){
                setDeleting(false)
                toast.success("Remove the member successully")
                router.refresh()
            }

          } catch (error) {
            setDeleting(false);
            setError(true);
          }

    }
  
    return (
      <>
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button size="1" color="tomato" variant='soft' disabled={isDeleting}>
              Remove {isDeleting && <Spinner />}
            </Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content>
            <AlertDialog.Title>Note</AlertDialog.Title>
            <AlertDialog.Description>
              Are you sure you want to remove this member from your team?
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
                  onClick={removeMembers}
                >
                 Remove
                </Button>
           
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
  
        <AlertDialog.Root open={error}>
          <AlertDialog.Content>
            <AlertDialog.Title>Error</AlertDialog.Title>
            <AlertDialog.Description>
              This issue cannot be deleted.
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

export default MemberDeleteButton
