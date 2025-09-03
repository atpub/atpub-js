import { Service } from '../../service.js';
import * as cheerio from 'cheerio';
export default new Service('backloggd', {
    name: "Backloggd",
    urlPattern: 'https://backloggd.com/u/{identifier}/',
    verificationMethods: {
        profile: async ({ did, claim }) => {
            let proofUrl = `https://backloggd.com/u/${claim.identifier}/`
            let url = `https://keyoxide.org/api/3/get/http?url=${encodeURI(proofUrl)}&format=text`
            const html = await (await fetch(url)).text()
            const $ = cheerio.load(html)
            const description = $('a.secondary-link').text()
            return {
                ok: description?.includes(did),
                proofUrl,
            }
        }
    }
})
