import { after } from 'next/server'

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function AsyncComponent() {
  await sleep(1000)

  after(async () => {
    console.log('after AsyncComponent')
  })

  return <div>Async Component</div>
}
