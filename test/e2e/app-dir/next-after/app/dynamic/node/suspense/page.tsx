import { after } from 'next/server'
import { Suspense } from 'react'
import { AsyncComponent } from './components/async-component'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function DynamicNodeWithSuspensePage() {
  after(async () => {
    console.log('after DynamicNodeWithSuspensePage')
  })

  return (
    <>
      <h1>Dynamic Node Page With Suspense</h1>
      <Suspense fallback={<div>loading...</div>}>
        <AsyncComponent />
      </Suspense>
    </>
  )
}
