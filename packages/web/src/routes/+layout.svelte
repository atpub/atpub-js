<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	
	let { children } = $props();
</script>

<svelte:head>
	<title>atpub.me</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="w-full">
	<div class="mx-auto max-w-4xl pt-6 px-3 lg:px-0">
		<div class="text-2xl title font-mono"><a href="/">ATpub.me</a></div>

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