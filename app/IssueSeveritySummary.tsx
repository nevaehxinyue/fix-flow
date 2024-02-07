import { Severity, Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import { stat } from "fs";
import Link from "next/link";


interface Props {
    minor: number;
    medium: number;
    major: number;
    critical: number;
}

const IssueSeveritySummary = ({ minor, medium, major, critical}: Props) => {

    const containers: {label: string, value: number, severity: Severity}[] = [
        {label: 'Minor Issues', value: minor, severity: 'MINOR'},
        {label: 'Medium Issues', value: medium, severity:'MEDIUM'},
        {label: 'Major Issues', value: major, severity:'MAJOR'},
        {label: 'Critical Issues', value: critical, severity:'CRITICAL'},
    ]
  return (
   <Flex gap="2" >
     {containers.map((container) => 
     <Card key={container.label}>
        <Flex direction="column" gap='1'>
            <Link className="text-sm font-medium" href={`/issues/list?status=${container.severity}`}>{container.label}</Link>
            <Text size="5" className="font-bold">{container.value}</Text>
        </Flex>
     </Card>)}
   </Flex>
  )
}

export default IssueSeveritySummary
