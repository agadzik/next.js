import { createNextDescribe } from 'e2e-utils'

createNextDescribe(
  'next-after (runtime: node.js)',
  {
    files: __dirname,
  },
  ({ next }) => {
    it('should work with dynamic node pages', async () => {
      const html = await next.render('/dynamic/node')
      expect(html).toContain('Dynamic Node Page')
      expect(next.cliOutput).toContain('after DynamicNodePage')
    })

    it('should work with dynamic node route handler', async () => {
      const res = await next.fetch('/api/dynamic/node')
      const data = await res.json()
      expect(data).toEqual({ runtime: 'node.js', dynamic: true })
      expect(next.cliOutput).toContain('after api/dynamic/node')
    })

    it('should not work with static node pages', async () => {
      const html = await next.render('/static/node')
      expect(html).toContain('Static Node Page')
      expect(next.cliOutput).not.toContain('after StaticNodePage')
    })

    it('should not work with static node route handler', async () => {
      const res = await next.fetch('/api/static/node')
      const data = await res.json()
      expect(data).toEqual({ runtime: 'node.js', dynamic: false })
      expect(next.cliOutput).not.toContain('after api/static/node')
    })
  }
)
