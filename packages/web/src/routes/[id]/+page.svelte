<script>
    import { client } from '$lib/client.svelte.js'
    import Profile from "$lib/components/Profile.svelte";

    let { data } = $props()

    let profile = $state(null)
    let claims = $state(null)
    let teams = $state(null)
    let atpubAgent = $derived(new client.ATpubUserAgent(data.id))

    /*let claims = $state([
        {
            value: {
                "$type": "fail.tree.identity.claim",
                "platform": "bsky",
                "identifier": data.profile.handle
            }
        },
        {
            value: {
                "$type": "fail.tree.identity.claim",
                "platform": "dns",
                "identifier": data.profile.handle
            }
        },
        ...data.claims
    ].map(claim => ({ ...claim, status: 'inProgress' })))*/

    $effect(async () => {
        profile = null
        claims = null
        teams = null
        profile = await atpubAgent.profile()
        claims = await atpubAgent.claims()
        claims.forEach(async (claim) => {
            if (claim.value.proofs && claim.value.proofs.length > 0) {
                claim.status = { ok: 'waiting' }
            } else {
                claim.status = { ok: null }
            }
        })
        teams = await atpubAgent.teams()
        claims.forEach(async (claim) => {
            claim.status = await client.verifyClaim(profile.did, claim.value)
        })
    })

</script>

<svelte:head>
    {#if profile}
        <title>@{profile.handle} · atpub.me</title>
    {/if}
</svelte:head>

<Profile data={{ profile, claims, teams }} />
