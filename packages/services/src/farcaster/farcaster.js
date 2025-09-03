import { Service } from '../../service.js';
import icon from './farcaster.svg';

export default new Service('farcaster', {
    name: "Farcaster",
    urlPattern: 'https://farcaster.xyz/{identifier}',
    renderFormat: '@{identifier}',
    icon,
    verificationMethods: {
        profile: async ({ did, claim, proof }) => {
            const proofUrl = `https://client.farcaster.xyz/v2/user-by-username?username=${claim.identifier}`
            const url = `https://keyoxide.org/api/3/get/http?url=${encodeURI(proofUrl)}&format=text`
            const json = await (await fetch(url)).json()
            const description = json.result?.user?.profile?.bio?.text || ''
            return {
                ok: description.includes(did),
                proofUrl
            }
        }
    }
})

