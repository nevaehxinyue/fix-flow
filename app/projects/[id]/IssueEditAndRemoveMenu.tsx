import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { DropdownMenu } from '@radix-ui/themes'
import React from 'react'
import NewIssueButton from './NewIssueButton'

const IssueEditAndRemoveMenu = () => {
  return (
   <DropdownMenu.Root>
    <DropdownMenu.Trigger>
        <button>
            <DotsVerticalIcon />
        </button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
        <DropdownMenu.Item><NewIssueButton /></DropdownMenu.Item>
        <DropdownMenu.Item>Remove</DropdownMenu.Item>
    </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export default IssueEditAndRemoveMenu
