import { NextRequest, NextResponse } from 'next/server'
import { after } from 'next/after'

export const dynamic = 'force-static'
export const runtime = 'edge'

export async function GET(request: NextRequest): Promise<NextResponse> {
  after(async () => {
    console.log('after api/static/edge')
  })
  return NextResponse.json({
    runtime: 'edge',
    dynamic: false,
  })
}
