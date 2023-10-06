import type { NextApiRequest, NextApiResponse } from 'next'
import { after } from 'next/server'

type ResponseData = {
  runtime: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  after(async () => {
    console.log('after api/legacy/node')
  })
  res.status(200).json({ runtime: 'node.js' })
}
