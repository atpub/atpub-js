
export default async function ({ did, params, claim, input }) {

    const url = `https://dns.google/resolve?name=_atproto.${claim.identifier}&type=TXT`
    const json = await (await fetch(url)).json()

    if (!json || !json.Answer) {
        return false
    }
    for (const answer of json.Answer) {
        if (answer.data === `did=${did}`) {
            return true
        }
    }
    return false
}