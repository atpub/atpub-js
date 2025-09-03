import { Service } from '../../service.js';
import * as cheerio from 'cheerio';
import icon from './nostr.svg';

export default new Service('nostr', {
    name: "Nostr",
    icon,
    urlPattern: 'https://njump.me/{identifier}',
    verificationMethods: {
        note: async ({ did, claim, proof }) => {
            let url = `https://njump.me/${proof.nevent}`
            //url = `https://keyoxide.org/api/3/get/http?url=${encodeURI(url)}&format=text`
            const html = await (await fetch(url)).text()
            const $ = cheerio.load(html)
            const description = $('.leading-6').text()
            //console.log(description, html)
            return {
                ok: description?.includes(did),
                proofUrl: url,
            }
        }
    }
})

