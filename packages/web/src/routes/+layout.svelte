<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.png';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	
	//import { BrowserOAuthClient } from '@atproto/oauth-client-browser'
	//import clientMetadata from '$lib/client-metadata.json'

	import { client, ctx } from '$lib/client.svelte.js'

	//client.loadServices()

	let search = $state("")

	/*let oaclient;
	async function login() {
		
		await oaclient.signIn('tree.fail', {
			//prompt: 'none'
		})
		console.log('OAuth init done')
	}
	async function OAuthInit () {
		oaclient = new BrowserOAuthClient({
			clientMetadata,
			handleResolver: 'https://pp0.co'
		})
		const res = await oaclient.init()
		console.log('session=',res)
		return oaclient
	}

	if (browser) {
		//OAuthInit()
	}*/

	function submitSearch() {
		const target = `/${search}`
		console.log(`redirecting to: ${target}`)
		ctx.profile = null
		search = ''
		setTimeout(() => {
			goto(target)
		}, 0)
	}

	let { children } = $props();
</script>

<svelte:head>
	<title>atpub.me</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="w-full">
	<div class="mx-auto max-w-4xl pt-6 px-3 lg:px-0">
		<div class="flex items-center h-12">
			<div class="mr-2 shrink-0"><a href="/"><img src={favicon} class="inline-block h-9 w-9 invert" title="ATpub" /></a></div>
			<div class="grow text-2xl title font-mono pr-1">
				<form onsubmit={() => submitSearch()}>
					<input type="text" class="input text-base w-full sm:w-92 ml-1 bg-white/5" placeholder={ctx.profile?.handle} bind:value={search} />
				</form>
			</div>
			<!--div><a href="" onclick={() => login()}>Login</a></div-->
		</div>

		<div class="mt-4">
			{@render children?.()}
		</div>

		<div class="opacity-50 p-2 text-sm border-t mt-10 border-white/20 sm:flex flex-wrap">
			<div class="grow">
				<!--a href="/">home</a--> 
				<a href="/services">services</a> 
				• <a href="/playground">playground</a> 
				• <a href="https://docs.atpub.me">docs</a> 
				• <a href="https://github.com/atpub">source code</a> 
				• <a href="/atpub.me">@atpub.me</a> 
			</div>
			<div class="mt-1.5 sm:mt-0">
				@atpub/web: <a href="https://github.com/atpub/atpub-js/tree/main/packages/web">v0.0.1</a>
			</div>
		</div>
	</div>
</div>