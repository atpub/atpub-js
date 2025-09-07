import * as cheerio from 'cheerio'
import { replacePlaceholders } from '../utils.js'
import { JSONPathJS } from "jsonpath-js"

export default async function ({ did, params, claim, input }) {
    let url = replacePlaceholders(params.url, { claim, input })

    let proxyUrl = url
    if (params.needProxy) {
        proxyUrl = `https://keyoxide.org/api/3/get/http?url=${encodeURI(url)}&format=text`
    }

    if (params.format === 'html') {
        const html = await (await fetch(proxyUrl)).text()

        if (params.selector) {
            const $ = cheerio.load(html)
            const el = $(params.selector)

            if (params.attr) {
                return el.attr(params.attr)?.includes(did)
            } else {
                return el.text()?.includes(did)
            }
        }
    }
    else if (params.format === 'json') {
        const json = await (await fetch(proxyUrl)).json()

        if (params.path) {
            const res = (new JSONPathJS(params.path)).find(json)
            return Boolean(res.find(x => x.includes(did)))
        }
    } else {
        const text = await (await fetch(proxyUrl)).text()
        return text.includes(did)
    }

    return false
}