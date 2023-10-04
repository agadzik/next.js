import {
  createNextDescribe,
  fetchJsonWithLogs,
  renderWithLogs,
} from 'e2e-utils'

createNextDescribe(
  'next-after (runtime: node.js)',
  {
    files: __dirname,
  },
  ({ next, isNextDev }) => {
    it('should work with dynamic node pages', async () => {
      const { html, logs } = await renderWithLogs(next, '/dynamic/node')

      expect(html).toContain('Dynamic Node Page')
      expect(logs).toContain('after DynamicNodePage')
    })

    it('should work with dynamic node route handler', async () => {
      const { data, logs } = await fetchJsonWithLogs(next, '/api/dynamic/node')

      expect(data).toEqual({ runtime: 'node.js', dynamic: true })
      expect(logs).toContain('after api/dynamic/node')
    })

    if (isNextDev) {
      describe('with `next dev`', () => {
        it('should work with static node pages', async () => {
          const { html, logs } = await renderWithLogs(next, '/static/node')

          expect(html).toContain('Static Node Page')
          expect(logs).toContain('after StaticNodePage')
        })

        it('should work with static node route handler', async () => {
          const { data, logs } = await fetchJsonWithLogs(
            next,
            '/api/static/node'
          )

          expect(data).toEqual({ runtime: 'node.js', dynamic: false })
          expect(logs).toContain('after api/static/node')
        })
      })
    } else {
      describe('with `next start`', () => {
        it('should work with static node pages at build time only', async () => {
          const { html, logs, buildLogs } = await renderWithLogs(
            next,
            '/static/node'
          )

          expect(html).toContain('Static Node Page')
          expect(logs).not.toContain('after StaticNodePage')
          expect(buildLogs).toContain('after StaticNodePage')
        })

        it('should work with static node route handler at build time only', async () => {
          const { data, logs, buildLogs } = await fetchJsonWithLogs(
            next,
            '/api/static/node'
          )

          expect(data).toEqual({ runtime: 'node.js', dynamic: false })
          expect(logs).not.toContain('after api/static/node')
          expect(buildLogs).toContain('after api/static/node')
        })
      })
    }
  }
)
