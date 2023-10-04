import {
  RequestStore,
  requestAsyncStorage,
} from './request-async-storage.external'

export function after(
  asyncFunctionOrPromise: RequestStore['waitUntil'][number]
) {
  const requestStore = requestAsyncStorage.getStore()
  if (!requestStore) {
    throw new Error(
      `Invariant: after() expects to have requestAsyncStorage, none available.`
    )
  }

  requestStore.waitUntil.push(asyncFunctionOrPromise)
}
