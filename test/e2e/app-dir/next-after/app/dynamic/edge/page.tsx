import { after } from 'next/after'

export const runtime = 'edge'

export default async function DynamicEdgePage() {
  after(async () => {
    console.log('after DynamicEdgePage')
  })

  return <h1>Dynamic Edge Page</h1>
}
