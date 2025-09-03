import { Service } from '../../service.js';
import * as cheerio from 'cheerio';
import icon from './lastfm.svg';

export default new Service('lastfm', {
    name: "Last.fm",
    urlPattern: 'https://www.last.fm/user/{identifier}',
    icon,
    verificationMethods: {
        profile: async ({ did, claim }) => {
            let proofUrl = `https://www.last.fm/user/${claim.identifier}`
            let url = `https://keyoxide.org/api/3/get/http?url=${encodeURI(proofUrl)}&format=text`
            const html = await (await fetch(url)).text()
            const $ = cheerio.load(html)
            const description = $('section.about-me-sidebar').text()
            return {
                ok: description?.includes(did),
                proofUrl,
            }
        }
    }
})
