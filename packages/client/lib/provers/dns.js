
export default async function ({ did, params, claim, input }) {

    const url = `https://dns.google/resolve?name=_atproto.${claim.identifier}&type=TXT`
    const json = await (await fetch(url)).json()

    const finish = (ok, error) => ({ ok, error, proxyUrl: url })

    if (!json || !json.Answer) {
        return finish(false)
    }
    for (const answer of json.Answer) {
        if (answer.data === `did=${did}`) {
            return finish(true)
        }
    }
    return finish(false)
}