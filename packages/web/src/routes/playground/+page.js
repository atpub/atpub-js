export function load ({ url }) {
    return {
        claim: url.searchParams.get('claim'),
        did: url.searchParams.get('did')
    }
}