import { NextRequest, NextResponse } from 'next/server'
import { after } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest): Promise<NextResponse> {
  after(async () => {
    console.log('after api/dynamic/node')
  })
  return NextResponse.json({
    runtime: 'node.js',
    dynamic: true,
  })
}
