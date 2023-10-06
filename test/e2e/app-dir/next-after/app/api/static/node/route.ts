import { NextRequest, NextResponse } from 'next/server'
import { after } from 'next/server'

export const dynamic = 'force-static'

export async function GET(request: NextRequest): Promise<NextResponse> {
  after(async () => {
    console.log('after api/static/node')
  })
  return NextResponse.json({
    runtime: 'node.js',
    dynamic: false,
  })
}
