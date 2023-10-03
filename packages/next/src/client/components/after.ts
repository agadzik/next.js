import {
  RequestStore,
  requestAsyncStorage,
} from './request-async-storage.external'
import { staticGenerationBailout } from './static-generation-bailout'

export function after(
  asyncFunctionOrPromise: RequestStore['waitUntil'][number]
) {
  if (
    staticGenerationBailout('after', {
      link: 'https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering',
    })
  ) {
    return
  }
  const requestStore = requestAsyncStorage.getStore()
  if (!requestStore) {
    throw new Error(
      `Invariant: after() expects to have requestAsyncStorage, none available.`
    )
  }

  requestStore.waitUntil.push(asyncFunctionOrPromise)
}
