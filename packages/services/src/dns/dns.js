import { Service } from '../../service.js'
import icon from './dns.svg'

export default new Service('dns', {
    name: "DNS",
    icon,
    verificationMethods: {
        txt: async ({ did, claim }) => {
            const url = `https://dns.google/resolve?name=_atproto.${claim.identifier}&type=TXT`
            const json = await (await fetch(url)).json()
            const finish = (ok) => ({ ok, proofUrl: url })
            if (!json || !json.Answer) {
                return finish(false)
            }
            for (const answer of json.Answer) {
                if (answer.data === `did=${did}`) {
                    return finish(true)
                }
            }
            return finish(false)
        },
        'well-known': async ({ did, claim }) => {
            let wellKnown;
            let baseUrl =  `https://${claim.identifier}/.well-known/atproto-did`
            const finish = (ok) => ({ ok, proofUrl: baseUrl })
            try {
                let url = `https://keyoxide.org/api/3/get/http?url=${encodeURI(baseUrl)}&format=text`
                wellKnown = await (await fetch(url)).text()
            } catch (e) {
                return finish(false)
            }
            return finish(wellKnown === did)
        }
    }
})
