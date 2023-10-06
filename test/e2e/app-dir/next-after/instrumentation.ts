import { after } from 'next/server'

export async function register() {
  console.log('register instrumentation')

  after(async () => {
    console.log('after instrumentation')
  })
}
