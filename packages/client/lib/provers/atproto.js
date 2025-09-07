import { replacePlaceholders } from '../utils.js'

export default async function ({ did, params, claim, input }) {
    const urlBase = 'https://pdsls.dev/at://{did}/app.bsky.actor.profile/self'
    const url = replacePlaceholders(urlBase, { did })
    
    return { ok: true, url }
}