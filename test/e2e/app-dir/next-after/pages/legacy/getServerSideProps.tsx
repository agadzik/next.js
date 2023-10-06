import type { InferGetServerSidePropsType } from 'next'
import { after } from 'next/server'

export const getServerSideProps = async (context) => {
  after(async () => {
    console.log('after getServerSideProps')
  })
  return { props: {} }
}

export default function Page(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return <h1>Get Server Side Props</h1>
}
