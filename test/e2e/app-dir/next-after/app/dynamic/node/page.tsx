import { after } from 'next/after'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function DynamicNodePage() {
  after(async () => {
    console.log('after DynamicNodePage')
  })

  return <h1>Dynamic Node Page</h1>
}
