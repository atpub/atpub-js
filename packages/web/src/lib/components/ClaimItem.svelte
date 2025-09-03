<script>
    import { serviceProviders } from '$lib/atpub.js'
    import defaultServiceIcon from '../../../static/default-service-icon.svg';


    console.log(serviceProviders)
    let { item } = $props()    
    let claim = $derived(item.value)

    let platform = $derived(serviceProviders[claim.platform])
    let identityUrl = $derived(platform?.identityUrl(claim.identifier))
    let status = $derived(item.status || { ok: 'waiting'} )

    let expanded = $state(false)

</script>

<div class="w-full leading-8  {expanded ? 'bg-white/10 mt-1' : 'hover:bg-white/10'} rounded cursor-pointer" onclick={() => expanded = !expanded} aria-label="Claim">
{#if platform}
    <div class="flex gap-2.5 items-center px-2">
        <div class=""><img src={platform.icon() ?? defaultServiceIcon} class="w-4.5 aspect-square invert opacity-50 grayscale" /></div>
        <div class="grow"><a href={identityUrl} target="_blank" class="{status.ok === true ? 'font-semibold text-[#3f87ff]' : (status.ok === false ? 'text-white/75 line-through' : ' text-white/75')} hover:underline" title={claim.identifier}>{platform.identifierRender(claim.identifier)}</a> <span class="opacity-50">[{platform.name()}]</span></div>
        <div class="opacity-75">
            <div class="{status.ok === "waiting" ? "block" : "hidden"} text-white/50"><svg class="animate-spin" style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"></path></svg></div>
            <div class="{status.ok === false ? "block" : "hidden"} text-red-500"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class=""><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div>
            <div class="{status.ok === true ? "block" : "hidden"} text-green-500"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class=""><polyline points="20 6 9 17 4 12"></polyline></svg></div>
        </div>
    </div>
    {#if expanded}
        <div class="p-3 mb-1 text-sm bg-white/5">
            <div>Profile link: <a href={identityUrl} target="_blank" class="hover:underline text-[#3f87ff] wrap-anywhere" title={identityUrl}>{identityUrl}</a></div>
            {#if item.status.proofMethod}
                <hr class="my-2 opacity-25" />
                <div>Proof method: <span class="font-bold font-mono bg-black/20 text-xs py-1 px-1.5 rounded-sm">{claim.platform}:{item.status.proofMethod}</span></div>
                <div>Proof link: <a href={item.status.proofUrl} target="_blank" class="text-[#3f87ff] wrap-anywhere">{item.status.proofUrl}</a></div>
            {/if}
            <hr class="my-2 opacity-25" />
            <div>Claim record: <a href="https://pdsls.dev/{item.uri}" target="_blank" class="text-[#3f87ff] wrap-anywhere">{item.uri}</a></div>
        </div>
    {/if}
{:else}
    <div class="italic opacity-50">unknown claim: {claim.identifier} [{claim.platform}]</div>
{/if}
</div>