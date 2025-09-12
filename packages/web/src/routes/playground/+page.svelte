<script>
    import { client, ctx } from '$lib/client.svelte.js'
    import CodeMirror from "svelte-codemirror-editor";
    import { yaml as yamlLang } from "@codemirror/lang-yaml";
    import { json } from "@codemirror/lang-json";
    import * as yaml from 'js-yaml';
    import { oneDark } from "@codemirror/theme-one-dark";
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { Tabs, Switch } from '@skeletonlabs/skeleton-svelte';
    import defaultServiceIcon from '../../../static/default-service-icon.svg'

    let { data } = $props()
    let group = $state('claim')
    let yamlEnabled = $state(false)
    let example = $state(data.claim ? '' : 3)

    let parseError = null
    let did = $state(data.did || 'did:plc:mm2qkv2rroigo4y4xa37ib2e')
    let claimText = $state(data.claim ? atob(data.claim) : (example !== '' ? JSON.stringify(client.spec.example.claim[example].item, null, 2) : ''))
    let claimTextParsed = $derived(claimText !== "" ? parse(claimText) : {})
    let claimHaveProofs = $derived(claimTextParsed.proofs && claimTextParsed.proofs.length > 0)

    let valid = $derived(claimText ? validate(claimTextParsed) : { ok: null })
    let validationErrors = $derived(valid && valid.errors ? valid.errors : null)

    let service = $derived(client.getService(claimTextParsed.service))
    let identityUrl = $derived(service?.identityUrl(claimTextParsed.identifier))
    let identifier = $derived(service?.identifierRender(claimTextParsed.identifier))
    let serviceIcon = $derived(service?.icon() ?? defaultServiceIcon)

    let result = $state(null)
    let resultText = $derived(result?.text || '')

    if (claimText) {
        setTimeout(sendRequest, 0)
    }

    function parse(str) {
        let out;
        try {
            out = JSON.parse(str)
        } catch (e) {
            parseError = e
            return ''
        }
        parseError = null
        return out
    }

    function validate(obj) {
        if (obj === "") {
            return { ok: false, errors: [{ error: parseError }]}
        }
        return client.validate('claim', obj)
    }

    async function sendRequest() {
        result = null
        if (!claimHaveProofs) {
            return null
        }
        const startTime = performance.now();
        const res = await client.verifyClaim(did, yaml.load(claimText))
        result = {
            ok: res.ok,
            text: JSON.stringify(res, null, 2).trim(),
            elapsedTime: performance.now() - startTime
        }
    }

    function changeExample() {
        if (example !== '') {
            claimText = JSON.stringify(client.spec.example.claim[example].item, null, 2)
            sendRequest()
            result = null
        } else {
            claimText = ''
        }
        return false
    }

</script>

<h2 class="text-3xl my-6">ATpub Playground</h2>

<Tabs value={group} onValueChange={(e) => (group = e.value)}>
  {#snippet list()}
    <Tabs.Control value="claim">Identity Claim</Tabs.Control>
    <Tabs.Control value="service">Service</Tabs.Control>
  {/snippet}
  {#snippet content()}

    <Tabs.Panel value="claim">
        
        <label class="label mt-4">
            <span class="label-text">Examples</span>
            <form>
            <select class="select w-92 p-2" bind:value={example} onchange={() => changeExample()}>
                <option value="">--</option>
                {#each client.spec.example.claim as claim, i}
                    <option value={i}>{claim.title}</option>
                {/each}
            </select>
            </form>
        </label>
        <div class="mt-4 mb-4">
            <div class="flex items-center gap-4 mb-1.5">
                <div class="label-text">Claim Object <span class="opacity-50">[<a href="https://json-schema.app/view/%23?url=https%3A%2F%2Fspec.atpub.me%2Fschema%2Fclaim.json" target="_blank">me.atpub.identity.claim</a>]</span></div>
                <div class="grow flex gap-1 text-xs items-center opacity-75">
                    {#if valid && valid.ok === true}
                        <div class="text-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <span>Valid</span>
                    {:else}
                        <div class="text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </div>
                        <span>Validation Error</span>
                    {/if}
                </div>
                <!--label class="flex items-center gap-2 scale-75">
                    <Switch name="example" checked={yamlEnabled} onCheckedChange={(e) => (yamlEnabled = e.checked)} />
                    <div>YAML</div>
                </label-->
            </div>
            <CodeMirror bind:value={claimText} lang={json()} theme={oneDark} />
        </div>

        {#if validationErrors && validationErrors.length > 0}
            <div class="mt-2 rounded-xs bg-red-500/75 py-2 px-3">
                {#each validationErrors as err}
                    <div class="text-sm">{err.error}</div>
                {/each}
            </div>
        {/if}

        <div class="mb-6">
            <span class="label-text mb-1.5">Output</span>
            <div class="py-3 px-4 bg-white/10 rounded-sm flex items-center gap-3 text-xl">
                <img src={serviceIcon} class="invert aspect-square h-6 opacity-50" alt={service?.name()} />
                <div class="">
                    <a href={identityUrl} class="{result && result?.ok === true ? 'text-[#3f87ff] font-semibold' : (result && result.ok === false ? 'line-through' : '')}">{identifier}</a>
                     <span class="opacity-50">[{service?.name()}]</span>
                </div>
                <div class="opacity-50 text-sm">→ <a href={identityUrl}>{identityUrl}</a></div>
            </div>
        </div>

        {#if claimHaveProofs && !(validationErrors && validationErrors.length > 0)}

            <h3 class="text-xl">Proof Verification</h3>
            <label class="label mt-4">
                <span class="label-text">DID</span>
                <input class="input w-92" type="text" bind:value={did} placeholder="did:plc:xyz..." />
            </label>

            <div class="mt-4 flex gap-4 items-center">
                <button class="btn preset-filled" onclick={sendRequest}>Verify claim</button>
                {#if result}
                    <div class="opacity-50 text-sm">{result.elapsedTime}ms</div>
                {/if}
            </div>

            {#if resultText}
                <div class="mt-6">
                    <span class="label-text mb-1">Verification Result</span>
                    <CodeMirror bind:value={resultText} lang={json()} theme={oneDark} readonly="true" />
                </div>
            {/if}
        {/if}

    </Tabs.Panel>

    <Tabs.Panel value="service">
        TODO
    </Tabs.Panel>

  {/snippet}
</Tabs>