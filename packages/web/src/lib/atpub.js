import { AtpAgent } from '@atproto/api'
import services from '@atpub/services'

//const availableServices = await services()

export async function verifyClaim (did, claim) {
    if (!claim.proofs || claim.proofs.length === 0) {
        return { ok: null }
    }
    const platformId = claim.platform
    const platform = services[platformId]
    if (!platform) {
        return { ok: false }
    }
    const proof = claim.proofs[0]
    const res = await platform.verifyProof(did, claim, proof)
    return res
}

export class AtpubAgent {
    constructor (actor) {
        this.actor = actor
        this.agent = new AtpAgent({ service: 'https://api.bsky.app' })
    }

    async profile() {
        const profile = (await this.agent.getProfile({ actor: this.actor })).data
        const didDoc = await (await fetch(`https://plc.directory/${profile.did}`)).json()
        const pdsEndpoint = didDoc.service?.find(s => s.id === "#atproto_pds")?.serviceEndpoint
        this.pdsAgent = new AtpAgent({ service: pdsEndpoint })
        this.profile = profile
        return profile
    }

    async claims() {
        const claims = (await this.pdsAgent.com.atproto.repo.listRecords({
            repo: this.actor,
            collection: 'fail.tree.identity.claim',
        })).data.records
        return [{
            value: {
                $type: "fail.tree.identity.claim",
                platform: "bsky",
                identifier: this.profile.handle,
                proofs: [{ method: "did" }]
            }
        },
        /*{
            value: {
                $type: "fail.tree.identity.claim",
                platform: "dns",
                identifier: this.profile.handle
            }
        },*/ ...claims]
    }

    async teams() {
        const memberships = (await this.pdsAgent.com.atproto.repo.listRecords({
            repo: this.actor,
            collection: 'fail.tree.team.membership',
        })).data.records.reverse()

        const teams = []
        for (const ms of memberships) {
            const tprof = (await this.agent.getProfile({ actor: ms.value.team })).data
            teams.push({
                membership: ms,
                profile: tprof
            })
        }  
        return teams
    }
}

export const serviceProviders = services;

export function serviceProviderList () {
    return services
}