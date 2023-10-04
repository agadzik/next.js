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
  ({ next }) => {
    it('should work with edge pages', async () => {
      const { html, logs } = await renderWithLogs(next, '/dynamic/edge')

      expect(html).toContain('Dynamic Edge Page')
      expect(logs).toContain('after DynamicEdgePage')
    })

    it('should work with edge route handler', async () => {
      const { data, logs } = await fetchJsonWithLogs(next, '/api/dynamic/edge')

      expect(data).toEqual({ runtime: 'edge', dynamic: true })
      expect(logs).toContain('after api/dynamic/edge')
    })
  }
)
