import { NextRequest, NextResponse } from 'next/server'
import { after } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest): Promise<NextResponse> {
  after(async () => {
    console.log('after api/dynamic/edge')
  })
  return NextResponse.json({
    runtime: 'edge',
    dynamic: true,
  })
}
