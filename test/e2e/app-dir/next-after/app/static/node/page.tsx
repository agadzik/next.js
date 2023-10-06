import { after } from 'next/server'

export const dynamic = 'force-static'
export const runtime = 'nodejs'

export default async function StaticNodePage() {
  after(async () => {
    console.log('after StaticNodePage')
  })

  return <h1>Static Node Page</h1>
}
