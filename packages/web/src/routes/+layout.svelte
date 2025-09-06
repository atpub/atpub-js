<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { browser } from '$app/environment';
	
	import { BrowserOAuthClient } from '@atproto/oauth-client-browser'
	import clientMetadata from '$lib/client-metadata.json'

	let client;
	async function initOAuth() {
		client = new BrowserOAuthClient({
			clientMetadata,
			handleResolver: 'https://pp0.co'
		})
		const res = await client.init()
		console.log('session=',res)
		await client.signIn('tree.fail', {
			prompt: 'none'
		})
		console.log('OAuth init done')
	}

	if (browser) {
		initOAuth()
	}

	let { children } = $props();
</script>

<svelte:head>
	<title>atpub.me</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="w-full">
	<div class="mx-auto max-w-4xl pt-6 px-3 lg:px-0">
		<div class="text-2xl title font-mono"><a href="/">ATpub.me</a> / <input type="text" class="border border-white/20 text-lg w-92 ml-1" placeholder="tree.fail" /></div>

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
				@atpub/web: <a href="/">v0.0.1</a> • services: <a href="/">2025.9.1</a>
			</div>
		</div>
	</div>
</div>