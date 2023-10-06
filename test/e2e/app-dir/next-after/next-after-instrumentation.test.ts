import {
  createNextDescribe,
  fetchJsonWithLogs,
  renderWithLogs,
} from 'e2e-utils'

createNextDescribe(
  'next-after with instrumentation',
  {
    files: __dirname,
    nextConfig: {
      experimental: {
        instrumentationHook: true,
      },
    },
  },
  ({ next, isNextDev }) => {
    describe('using the edge runtime', () => {
      it('should work with edge pages', async () => {
        const { html, logs } = await renderWithLogs(next, '/dynamic/edge')

        expect(html).toContain('Dynamic Edge Page')
        expect(logs).toContain('register instrumentation')
        expect(logs).toContain('after instrumentation')
      })

      it('should work with edge route handlers', async () => {
        const { data, logs } = await fetchJsonWithLogs(
          next,
          '/api/dynamic/edge'
        )

        expect(data).toEqual({ runtime: 'edge', dynamic: true })
        expect(logs).toContain('register instrumentation')
        expect(logs).toContain('after instrumentation')
      })

      // TODO: fix edge functions to work with instrumentation
      // eslint-disable-next-line jest/no-commented-out-tests
      // it('should work with edge API routes', async () => {
      //   const { data, logs } = await fetchJsonWithLogs(next, '/api/legacy/edge')

      //   expect(data).toEqual({ runtime: 'edge' })
      //   expect(logs).toContain('register instrumentation')
      //   expect(logs).toContain('after instrumentation')
      // })
    })

    describe('using the node.js runtime', () => {
      it('should work with dynamic node pages', async () => {
        const { html, logs } = await renderWithLogs(next, '/dynamic/node')

        expect(html).toContain('Dynamic Node Page')
        expect(logs).toContain('register instrumentation')
        expect(logs).toContain('after instrumentation')
      })

      it('should work with dynamic node route handlers', async () => {
        const { data, logs } = await fetchJsonWithLogs(
          next,
          '/api/dynamic/node'
        )

        expect(data).toEqual({ runtime: 'node.js', dynamic: true })
        expect(logs).toContain('register instrumentation')
        expect(logs).toContain('after instrumentation')
      })

      it('should work with node API routes', async () => {
        const { data, logs } = await fetchJsonWithLogs(next, '/api/legacy/node')

        expect(data).toEqual({ runtime: 'node.js' })
        expect(logs).toContain('register instrumentation')
        expect(logs).toContain('after instrumentation')
      })

      it('should work with getServerSideProps node pages', async () => {
        const { html, logs } = await renderWithLogs(
          next,
          '/legacy/getServerSideProps'
        )

        expect(html).toContain('Get Server Side Props')
        expect(logs).toContain('register instrumentation')
        expect(logs).toContain('after instrumentation')
      })

      if (isNextDev) {
        describe('with `next dev`', () => {
          it('should work with static node pages', async () => {
            const { html, logs } = await renderWithLogs(next, '/static/node')

            expect(html).toContain('Static Node Page')
            expect(logs).toContain('register instrumentation')
            expect(logs).toContain('after instrumentation')
          })

          it('should work with static node route handlers', async () => {
            const { data, logs } = await fetchJsonWithLogs(
              next,
              '/api/static/node'
            )

            expect(data).toEqual({ runtime: 'node.js', dynamic: false })
            expect(logs).toContain('register instrumentation')
            expect(logs).toContain('after instrumentation')
          })

          it('should work with getStaticProps pages', async () => {
            const { html, logs } = await renderWithLogs(
              next,
              '/legacy/getStaticProps'
            )

            expect(html).toContain('Get Static Props')
            expect(logs).toContain('register instrumentation')
            expect(logs).toContain('after instrumentation')
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
            expect(logs).not.toContain('register instrumentation')
            expect(logs).not.toContain('after instrumentation')
            expect(buildLogs).toContain('register instrumentation')
            expect(buildLogs).toContain('after instrumentation')
          })

          it('should work with static node route handlers at build time only', async () => {
            const { data, logs, buildLogs } = await fetchJsonWithLogs(
              next,
              '/api/static/node'
            )

            expect(data).toEqual({ runtime: 'node.js', dynamic: false })
            expect(logs).not.toContain('register instrumentation')
            expect(logs).not.toContain('after instrumentation')
            expect(buildLogs).toContain('register instrumentation')
            expect(buildLogs).toContain('after instrumentation')
          })

          it('should work with getStaticProps pages at build time only', async () => {
            const { html, logs, buildLogs } = await renderWithLogs(
              next,
              '/legacy/getStaticProps'
            )

            expect(html).toContain('Get Static Props')
            expect(logs).not.toContain('register instrumentation')
            expect(logs).not.toContain('after instrumentation')
            expect(buildLogs).toContain('register instrumentation')
            expect(buildLogs).toContain('after instrumentation')
          })
        })
      }
    })
  }
)
