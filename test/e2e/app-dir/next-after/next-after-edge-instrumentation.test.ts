import {
  createNextDescribe,
  fetchJsonWithLogs,
  renderWithLogs,
} from 'e2e-utils'

createNextDescribe(
  'next-after with instrumentation (runtime: edge)',
  {
    files: __dirname,
    nextConfig: {
      experimental: {
        instrumentationHook: true,
      },
    },
  },
  ({ next }) => {
    it('should work with dynamic edge pages', async () => {
      const { html, logs } = await renderWithLogs(next, '/dynamic/edge')

      expect(html).toContain('Dynamic Edge Page')
      expect(logs).toContain('register instrumentation')
      expect(logs).toContain('after instrumentation')
      expect(logs).toContain('after DynamicEdgePage')
    })

    it('should work with dynamic edge route handler', async () => {
      const { data, logs } = await fetchJsonWithLogs(next, '/api/dynamic/edge')

      expect(data).toEqual({ runtime: 'edge', dynamic: true })
      expect(logs).toContain('after api/dynamic/edge')
      expect(logs).toContain('register instrumentation')
      expect(logs).toContain('after instrumentation')
    })

    it('should work with static edge pages', async () => {
      const { html, logs } = await renderWithLogs(next, '/static/edge')

      expect(html).toContain('Static Edge Page')
      expect(logs).toContain('after StaticEdgePage')
      expect(logs).toContain('register instrumentation')
      expect(logs).toContain('after instrumentation')
    })

    it('should work with static edge route handler', async () => {
      const { data, logs } = await fetchJsonWithLogs(next, '/api/static/edge')

      expect(data).toEqual({ runtime: 'edge', dynamic: false })
      expect(logs).toContain('after api/static/edge')
      expect(logs).toContain('register instrumentation')
      expect(logs).toContain('after instrumentation')
    })
  }
)
