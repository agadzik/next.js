/**
 * Interface representing the state for the `after(...)` function.
 * It holds a list of tasks, each of which can be a function returning a Promise or a Promise itself.
 */
interface AfterState {
  tasks: ((() => Promise<unknown>) | Promise<unknown>)[]
}

// properly type globalThis to include our custom symbol
const afterGlobal: typeof globalThis & { [GLOBAL_KEY]: AfterState } =
  globalThis as any

// We still need a global key to bypass Webpack's layering of modules.
const GLOBAL_KEY = Symbol.for('__next_internal_after__')
const state: AfterState =
  afterGlobal[GLOBAL_KEY] ||
  (afterGlobal[GLOBAL_KEY] = {
    tasks: [],
  })

/**
 * Function to register a task to be performed after the response has closed.
 * The task can either be an async function or a promise.
 *
 * @param asyncFunctionOrPromise - The async function or promise to be executed later.
 */
export function after(asyncFunctionOrPromise: AfterState['tasks'][number]) {
  state.tasks.push(async () => {
    let promise = asyncFunctionOrPromise
    if (typeof asyncFunctionOrPromise === 'function') {
      promise = asyncFunctionOrPromise()
    }

    await promise

    // remove the task from the list of tasks once it has been executed
    state.tasks.splice(state.tasks.indexOf(asyncFunctionOrPromise), 1)
  })
}

/**
 * Function to retrieve all async tasks registered via the `after(...)` function.
 *
 * @returns An array of tasks registered to be executed later.
 */
export function internal_getAfterTasks() {
  return state.tasks
}
