import type { InferGetStaticPropsType } from 'next'
import { after } from 'next/server'

export const getStaticProps = async (context) => {
  after(async () => {
    console.log('after getStaticProps')
  })
  return { props: {} }
}

export default function Page(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return <h1>Get Static Props</h1>
}
