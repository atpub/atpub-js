import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { AtpubAgent } from '@atpub/client'

const app = new Hono()

app.get('/', (c) => c.json({ 
    'server': '0.1.0',
    'client': '0.1.0',
}))

app.get('/:id', async (c) => {

    const agent = new AtpubAgent(c.req.param('id'))
    const profile = await agent.profile()
    const claims = await agent.claims()
    const teams = await agent.teams()

    return c.json({
        profile,
        claims,
        teams
    })
})

const PORT = 3008

serve({
    fetch: app.fetch,
    port: PORT
})
console.log('Server started at port', PORT)