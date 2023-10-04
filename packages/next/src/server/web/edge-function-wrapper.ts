import { AdapterOptions, adapter } from './adapter'
import type { NextRequest } from './spec-extension/request'
import { NextFetchEvent } from './spec-extension/fetch-event'
import type { NextMiddleware, NextMiddlewareResult } from './types'
import { RequestAsyncStorageWrapper } from '../async-storage/request-async-storage-wrapper'
import { requestAsyncStorage } from '../../client/components/request-async-storage.external'

export class EdgeFunctionWrapper {
  private readonly functionHandler: NextMiddleware

  constructor(handler: NextMiddleware) {
    this.functionHandler = handler
  }

  public static wrap(options: AdapterOptions) {
    // Create the edge function wrapper.
    const wrapper = new EdgeFunctionWrapper(options.handler)

    // Return the wrapping function.
    return (opts: AdapterOptions) => {
      return adapter({
        ...opts,
        ...options,
        // Bind the handler method to the wrapper so it still has context.
        handler: wrapper.handler.bind(wrapper),
      })
    }
  }

  private async handler(
    request: NextRequest,
    evt: NextFetchEvent
  ): Promise<NextMiddlewareResult> {
    return RequestAsyncStorageWrapper.wrap(
      requestAsyncStorage,
      { req: request },
      async (requestStore) => {
        // Get the response from the handler.
        const response = await this.functionHandler(request, evt)

        evt.waitUntil(
          Promise.all(
            requestStore.waitUntil.map((p) =>
              typeof p === 'function' ? p() : p
            )
          )
        )

        return response
      }
    )
  }
}
