import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const IssuesToolBar = () => {
  return (
    <div className="mb-3">
    <Button>
      <Link href="/issues/new">New Issue</Link>
    </Button>
  </div>
  )
}

export default IssuesToolBar
