import { Service } from '../../service.js';
import * as cheerio from 'cheerio';
import icon from './telegram.svg';

export default new Service('telegram', {
    name: "Telegram",
    urlPattern: 'https://t.me/{identifier}',
    icon,
    renderFormat: '@{identifier}',
    verificationMethods: {
        profile: async ({ did, claim }) => {
            let proofUrl = `https://t.me/${claim.identifier}`
            let url = `https://keyoxide.org/api/3/get/http?url=${encodeURI(proofUrl)}&format=text`
            const html = await (await fetch(url)).text()
            const $ = cheerio.load(html)
            const description = $('meta[property="og:description"]').attr('content')
            return {
                ok: description?.includes(did),
                proofUrl,
            }
        }
    }
})
