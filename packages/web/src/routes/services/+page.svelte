<script>
    import { serviceProviderList } from '$lib/atpub.js'
    import defaultServiceIcon from '../../../static/default-service-icon.svg';

    let sorted = Object.entries(serviceProviderList()).sort()
</script>

<h2 class="text-2xl">Available services</h2>
<div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 mt-8 gap-8">
    {#each sorted as [id, platform]}
        <div class="grid grid-cols-1 gap-2 items-center">
            <div class="place-self-center"><img src={platform.icon() ?? defaultServiceIcon} class="grayscale aspect-square w-14 invert" /></div>
            <div class="place-self-center mt-2 text-lg">{platform.config.name}</div>
            <!--div class="place-self-center bg-white/20 mt-1 py-1 px-1.5 rounded font-mono text-sm">{id}</div-->
        </div>
    {/each}
</div>