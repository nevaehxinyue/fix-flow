import { ProjectStatus } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

const projectStatuses: Record<ProjectStatus, {label: string, color: 'green' | 'sky'}> = {
  OPEN: {label: 'Open', color: 'sky'},
  COMPLETED: {label: 'Completed', color: 'green'},

}

const ProjectStatusBadge = ({status}: {status: ProjectStatus}) => {
  
  return (
    <Badge color={projectStatuses[status].color}>{projectStatuses[status].label}</Badge> 
  )
}

export default ProjectStatusBadge
