import { Service } from '../../service.js';
import * as cheerio from 'cheerio';
import icon from './trakt.svg';

export default new Service('trakt', {
    name: "Trakt",
    urlPattern: 'https://trakt.tv/users/{identifier}',
    icon,
    verificationMethods: {
        profile: async ({ did, claim }) => {
            let proofUrl = `https://trakt.tv/users/${claim.identifier}`
            let url = `https://keyoxide.org/api/3/get/http?url=${encodeURI(proofUrl)}&format=text`
            const html = await (await fetch(url)).text()
            const $ = cheerio.load(html)
            const description = $('div.about-me-text').text()
            return {
                ok: description?.includes(did),
                proofUrl,
            }
        }
    }
})
