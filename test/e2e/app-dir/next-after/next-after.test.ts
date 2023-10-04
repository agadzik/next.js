import {
  createNextDescribe,
  fetchJsonWithLogs,
  renderWithLogs,
} from 'e2e-utils'

createNextDescribe(
  'next-after (runtime: edge)',
  {
    files: __dirname,
  },
  ({ next, isNextDev }) => {
    describe('using the edge runtime', () => {
      it('should work with edge pages', async () => {
        const { html, logs } = await renderWithLogs(next, '/dynamic/edge')

        expect(html).toContain('Dynamic Edge Page')
        expect(logs).toContain('after DynamicEdgePage')
      })

      it('should work with edge route handlers', async () => {
        const { data, logs } = await fetchJsonWithLogs(
          next,
          '/api/dynamic/edge'
        )

        expect(data).toEqual({ runtime: 'edge', dynamic: true })
        expect(logs).toContain('after api/dynamic/edge')
      })

      it('should work with edge API routes', async () => {
        const { data, logs } = await fetchJsonWithLogs(next, '/api/legacy/edge')

        expect(data).toEqual({ runtime: 'edge' })
        expect(logs).toContain('after api/legacy/edge')
      })
    })

    describe('using the node.js runtime', () => {
      it('should work with dynamic node pages', async () => {
        const { html, logs } = await renderWithLogs(next, '/dynamic/node')

        expect(html).toContain('Dynamic Node Page')
        expect(logs).toContain('after DynamicNodePage')
      })

      it('should work with dynamic node route handlers', async () => {
        const { data, logs } = await fetchJsonWithLogs(
          next,
          '/api/dynamic/node'
        )

        expect(data).toEqual({ runtime: 'node.js', dynamic: true })
        expect(logs).toContain('after api/dynamic/node')
      })

      it('should work with node API routes', async () => {
        const { data, logs } = await fetchJsonWithLogs(next, '/api/legacy/node')

        expect(data).toEqual({ runtime: 'node.js' })
        expect(logs).toContain('after api/legacy/node')
      })

      it('should work with getServerSideProps node pages', async () => {
        const { html, logs } = await renderWithLogs(
          next,
          '/legacy/getServerSideProps'
        )

        expect(html).toContain('Get Server Side Props')
        expect(logs).toContain('after getServerSideProps')
      })

      if (isNextDev) {
        describe('with `next dev`', () => {
          it('should work with static node pages', async () => {
            const { html, logs } = await renderWithLogs(next, '/static/node')

            expect(html).toContain('Static Node Page')
            expect(logs).toContain('after StaticNodePage')
          })

          it('should work with static node route handlers', async () => {
            const { data, logs } = await fetchJsonWithLogs(
              next,
              '/api/static/node'
            )

            expect(data).toEqual({ runtime: 'node.js', dynamic: false })
            expect(logs).toContain('after api/static/node')
          })

          it('should work with getStaticProps pages', async () => {
            const { html, logs } = await renderWithLogs(
              next,
              '/legacy/getStaticProps'
            )

            expect(html).toContain('Get Static Props')
            expect(logs).toContain('after getStaticProps')
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

          it('should work with static node route handlers at build time only', async () => {
            const { data, logs, buildLogs } = await fetchJsonWithLogs(
              next,
              '/api/static/node'
            )

            expect(data).toEqual({ runtime: 'node.js', dynamic: false })
            expect(logs).not.toContain('after api/static/node')
            expect(buildLogs).toContain('after api/static/node')
          })

          it('should work with getStaticProps pages at build time only', async () => {
            const { html, logs, buildLogs } = await renderWithLogs(
              next,
              '/legacy/getStaticProps'
            )

            expect(html).toContain('Get Static Props')
            expect(logs).not.toContain('after getStaticProps')
            expect(buildLogs).toContain('after getStaticProps')
          })
        })
      }
    })
  }
)
