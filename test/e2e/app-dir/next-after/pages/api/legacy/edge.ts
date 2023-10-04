import { after } from 'next/after'

export const config = {
  runtime: 'edge',
}

export default function handler(req: Request) {
  after(async () => {
    console.log('after api/legacy/edge')
  })

  return Response.json({ runtime: 'edge' })
}
