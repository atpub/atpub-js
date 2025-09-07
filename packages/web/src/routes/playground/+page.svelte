<script>
    import { client, ctx } from '$lib/client.svelte.js'
    import CodeMirror from "svelte-codemirror-editor";
    import { yaml as yamlLang } from "@codemirror/lang-yaml";
    import { json } from "@codemirror/lang-json";
    import * as yaml from 'js-yaml';
    import { oneDark } from "@codemirror/theme-one-dark";
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

    const example = {
            $type: "me.atpub.identity.claim",
            identifier: "atpub",
            proofs: [{ method: "profile" }],
            service: {
                name: "Custom GitHub",
                verificationMethods: {
                    "profile": {
                        type: "http",
                        url: "https://api.github.com/users/{claim.identifier}",
                        format: "json",
                        path: "$.bio",
                        needProxy: true
                    }
                }
            },
            createdAt: new Date().toISOString()
        }

    let did = $state('did:plc:mm2qkv2rroigo4y4xa37ib2e')
    let claimText = $derived(JSON.stringify(example, null, 2))
    let result = $state('')

    function reload() {
         if ($page.url.searchParams.get('did')) {
            did = $page.url.searchParams.get('did')
        }

        if ($page.url.searchParams.get('claim')) {
            claimText = atob($page.url.searchParams.get('claim'))
        }
    }
    reload()
    sendRequest()

    $effect(() => {
        reload()
        sendRequest()
    })


    async function sendRequest() {
        result = ''
        result = JSON.stringify(await client.verifyClaim(did, yaml.load(claimText)), null, 2).trim()
    }

</script>

<h2 class="text-xl">Playground</h2>

<div class="mt-4">
    DID: <input type="text" bind:value={did} class="border w-92" />
</div>
<div class="mt-2">
    Claim:
    <CodeMirror bind:value={claimText} lang={json()} theme={oneDark} />
    <!--textarea class="text-sm mt-2 w-full h-112 border font-mono whitespace-pre p-2" bind:value={claimText} spellcheck="false" autocorrect="off"></textarea-->
</div>

<button class="border" onclick={sendRequest}>Send</button>

{#if result}
    <h3 class="mt-3">Result</h3>
    <CodeMirror bind:value={result} lang={json()} theme={oneDark} readonly="true" />
{/if}