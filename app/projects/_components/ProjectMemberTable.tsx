
import { Button, Card, Flex, Heading, Table } from '@radix-ui/themes'
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from 'react';

import { User } from '@prisma/client';


const ProjectMemberTable = ( { members }: { members: User[]}) => {
   const columns = [
    {label: 'Team', classNames: 'text-gray-400 font-bold'},
    {label: 'Email', classNames: 'text-gray-400 font-bold'},
    {label: ' ', classNames: 'text-gray-400 font-bold'},
   ]
   
   if (!members) return null

  return (
    
        <Table.Root variant='surface'>
            <Table.Header>
                <Table.Row>
                    {columns.map(column => <Table.ColumnHeaderCell key={column.label} className={column.classNames}>
                        {column.label}
                    </Table.ColumnHeaderCell>)}
                    
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {members.map((member) => 
                <Table.Row key={member.id}>
                <Table.Cell>
                   {member.name}
                </Table.Cell>
                <Table.Cell>
                    {member.email}
                </Table.Cell>
                <Table.Cell>
                <Button>Remove</Button>
                </Table.Cell>
            </Table.Row>
                 )}
                
            </Table.Body>
        </Table.Root>
   
  )
}

export default ProjectMemberTable
