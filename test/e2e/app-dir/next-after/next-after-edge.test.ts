import { createNextDescribe } from 'e2e-utils'

createNextDescribe(
  'next-after (runtime: edge)',
  {
    files: __dirname,
  },
  ({ next }) => {
    it('should work with dynamic edge pages', async () => {
      const html = await next.render('/dynamic/edge')
      expect(html).toContain('Dynamic Edge Page')
      expect(next.cliOutput).toContain('after DynamicEdgePage')
    })

    it('should work with dynamic edge route handler', async () => {
      const res = await next.fetch('/api/dynamic/edge')
      const data = await res.json()
      expect(data).toEqual({ runtime: 'edge', dynamic: true })
      expect(next.cliOutput).toContain('after api/dynamic/edge')
    })

    it('should not work with static edge pages', async () => {
      const html = await next.render('/static/edge')
      expect(html).toContain('Static Edge Page')
      expect(next.cliOutput).not.toContain('after StaticEdgePage')
    })

    it('should not work with static edge route handler', async () => {
      const res = await next.fetch('/api/static/edge')
      const data = await res.json()
      expect(data).toEqual({ runtime: 'edge', dynamic: false })
      expect(next.cliOutput).not.toContain('after api/static/edge')
    })
  }
)
