import { Severity } from '@prisma/client'
import { Badge } from '@radix-ui/themes'


const severityMap: Record<Severity, { label: string, color: 'red' | 'bronze' | 'green'|'orange'}> = {
    MINOR: { label: 'Minor', color: 'green'},
    MEDIUM: { label: 'Medium', color: 'bronze'},
    MAJOR: { label: 'Major', color: 'orange'},
    CRITICAL: { label: 'Critical', color: 'red'},
}

const IssueSeverityBadge = ({ severity }: {severity: Severity}) => {
  return (
    <Badge color={severityMap[severity].color}>{severityMap[severity].label}</Badge>
  )
}

export default IssueSeverityBadge
