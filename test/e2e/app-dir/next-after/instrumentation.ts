import { after } from 'next/after'

export async function register() {
  console.log('register instrumentation')

  after(async () => {
    console.log('after instrumentation')
  })
}
