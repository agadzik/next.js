import { after } from 'next/after'

export const dynamic = 'force-static'
export const runtime = 'edge'

export default async function StaticEdgePage() {
  after(async () => {
    console.log('after StaticEdgePage')
  })

  return <h1>Static Edge Page</h1>
}
