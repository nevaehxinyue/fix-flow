'use client'
import { Spinner } from '@/app/components'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'


import  { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { FetchedProjectType } from './page'
import { useSession } from 'next-auth/react'

const DeleteProjectButton = ({project}: { project?: FetchedProjectType | null }) => {
    const [error, setError] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [ isCreator, setIsCreator ] = useState(false);
    const params = useParams();
    const router = useRouter();
    const { data: session } = useSession();

    //Check if the current user is the creator of the current project
    useEffect(()=> {
        if(session?.user.id === project?.createdBy.id){
            setIsCreator(true);
        }

    }, [session,project])
    

    const deleteProject= async() => {
        try {
            let response;
            setDeleting(true);
            if(isCreator){
                response = await axios.delete(`/api/projects/${params.id}` )
            } else {
                response = await axios.delete(`/api/projects/${params.id}/users/${session?.user.id}`)
            }
            
            if(response?.status === 201){
                setDeleting(false)
                toast.success("Removed the project successully")
                router.push('/')
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
        <Button size="1" color="red" variant='soft' disabled={isDeleting}>
            Yes {isDeleting && <Spinner />}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Note</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to remove this project? The action cannot be done.
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
              onClick={deleteProject}
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
          This project cannot be removed.
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

export default DeleteProjectButton
