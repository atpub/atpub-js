import { Service } from '../../service.js';
import icon from './bsky.svg'

export default new Service('bsky', {
    name: "Bluesky",
    urlPattern: 'https://bsky.app/profile/{identifier}',
    icon,
    renderFormat: '@{identifier}',
    verificationMethods: {
        did: ({ did }) => {
            return {
                ok: true,
                proofUrl: `https://pdsls.dev/at://${did}/app.bsky.actor.profile/self`,
            }
        }
    }
})

