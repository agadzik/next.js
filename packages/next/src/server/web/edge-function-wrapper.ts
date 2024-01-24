import type { AdapterOptions } from './adapter'
import { adapter } from './adapter'
import type { NextRequest } from './spec-extension/request'
import type { NextFetchEvent } from './spec-extension/fetch-event'
import type { NextMiddleware, NextMiddlewareResult } from './types'
import { RequestAsyncStorageWrapper } from '../async-storage/request-async-storage-wrapper'
import { requestAsyncStorage } from '../../client/components/request-async-storage.external'
import { internal_getAfterTasks } from '../after'

export class EdgeFunctionWrapper {
  private readonly functionHandler: NextMiddleware

  constructor(handler: NextMiddleware) {
    this.functionHandler = handler
  }

  public static wrap(options: AdapterOptions) {
    // Create the edge function wrapper.
    const wrapper = new EdgeFunctionWrapper(options.handler)

    // Return the wrapping function.
    return async (opts: AdapterOptions) => {
      const result = await adapter({
        ...opts,
        ...options,
        // Bind the handler method to the wrapper so it still has context.
        handler: wrapper.handler.bind(wrapper),
      })

      // This code runs for Edge API Routes (pages) only
      const afterTasks = internal_getAfterTasks()
      if (afterTasks.length > 0) {
        result.waitUntil = Promise.all([
          result.waitUntil,
          ...afterTasks.map((task) =>
            typeof task === 'function' ? task() : task
          ),
        ])
      }

      return result
    }
  }

  private async handler(
    request: NextRequest,
    evt: NextFetchEvent
  ): Promise<NextMiddlewareResult> {
    return RequestAsyncStorageWrapper.wrap(
      requestAsyncStorage,
      { req: request },
      async () => {
        // Get the response from the handler.
        const response = await this.functionHandler(request, evt)

        return response
      }
    )
  }
}
