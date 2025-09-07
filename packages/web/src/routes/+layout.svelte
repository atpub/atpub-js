<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.png';
	import { browser } from '$app/environment';
	
	import { BrowserOAuthClient } from '@atproto/oauth-client-browser'
	import clientMetadata from '$lib/client-metadata.json'

	import { client } from '$lib/client.svelte.js'

	//client.loadServices()

	let oaclient;
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
			<div class="mr-2"><a href="/"><img src={favicon} class="inline-block h-9 invert" title="ATpub" /></a></div>
			<div class="grow text-2xl title font-mono"><input type="text" class="border text-lg w-92 ml-1 bg-white/5" placeholder="tree.fail" /></div>
			<div><a href="" onclick={() => login()}>Login</a></div>
		</div>

		<div class="mt-4">
			{@render children?.()}
		</div>

		<div class="opacity-50 p-2 text-sm border-t mt-10 border-white/20 sm:flex flex-wrap">
			<div class="grow">
				<a href="/">home</a> 
				• <a href="/services">services</a> 
				• <a href="https://docs.atpub.me">docs</a> 
				• <a href="https://github.com/atpub/atpub-js/tree/main/packages/web">source code</a> 
				• <a href="/atpub.me">@atpub.me</a> 
			</div>
			<div class="mt-1.5 sm:mt-0">
				@atpub/web: <a href="/">v0.0.1</a> • services: <a href="https://services.atpub.me">{client.servicesBundle.time}</a>
			</div>
		</div>
	</div>
</div>