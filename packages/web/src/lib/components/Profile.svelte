<script>
    import ClaimItem from "$lib/components/ClaimItem.svelte";
    let { data } = $props()

    let profile = $derived(data.profile)
    let claims = $derived(data.claims)
    let teams = $derived(data.teams)
</script>

<div class="bg-white/10 px-4 py-6 border border-white/20 rounded-xs md:flex gap-6 flex-wrap md:flex-nowrap">
    <div class="md:w-1/2 text-center {profile === null ? 'animate-pulse' : ''}">
        <img src={profile?.avatar} alt={profile?.displayName} class="w-32 aspect-square rounded-full inline-block border-1 border-white/15 bg-white/15" />
        <h1 class="mt-2 text-3xl">{profile?.displayName}</h1>
        <div class="text-white/50 mt-1">@{profile?.handle}</div>
        <div class="text-sm py-2 px-4 bg-white/10 mt-2 font-mono inline-block rounded text-white/50">{profile?.did}</div>

        <div class="mt-4 whitespace-pre-wrap text-left p-1">{profile?.description}</div>
    </div>
    <div class="md:w-1/2 mt-6 md:mt-0">
        {#if profile}
            {#if !teams || teams.length !== 0}
                <div class="opacity-50 uppercase text-sm mb-1.5 flex gap-2">
                    Teams
                    <svg class="animate-spin {teams === null ? 'block' : 'hidden'}" style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"></path></svg>
                </div>
                <div class="grid grid-cols-1 gap-2 mb-4">
                    {#each teams as team}
                        <div class="flex items-center gap-2.5 hover:bg-white/10 rounded py-1 px-1.5">
                            <div>
                                <a href="/{team.profile.handle}"><img src={team.profile.avatar} class="w-12 aspect-square rounded-full inline-block border-1 border-white/15" /></a>
                            </div>
                            <div>
                                <div><a href="/{team.profile.handle}" class="hover:underline font-semibold opacity-75">{team.profile.displayName}</a></div>
                                <div class="text-sm opacity-50">@{team.profile.handle}</div>
                            </div>
                        </div>
                    {/each}
                </div>
                <!--div class="ml-1 mb-6 flex flex-wrap gap-2 items-center transition-all">
                    {#if teams && teams.length > 0}
                        {#each teams as team}
                            <div class="text-center hover:bg-white/20 p-2 rounded w-36 h-28 items-center justify-center">
                                <div>
                                    <a href="/{team.profile.handle}"><img src={team.profile.avatar} class="w-14 aspect-square rounded-full inline-block border-1 border-white/15" /></a>
                                    <div class="mt-1.5"></div>

                                </div>

                            </div>
                        {/each}
                    {/if}
                </div-->
            {/if}

            <div class="opacity-50 uppercase text-sm mb-1.5 flex gap-2">Identity claims<div><svg class="animate-spin {claims === null ? 'block' : 'hidden'}" style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"></path></svg></div></div>
            {#if claims !== null}
                <div class="">
                    {#if claims.length === 0}
                        No claims
                    {:else}
                        {#each claims as item}
                            <div><ClaimItem {item} /></div>
                        {/each}
                    {/if}
                </div>
            {/if}
        {/if}
    </div>
</div>