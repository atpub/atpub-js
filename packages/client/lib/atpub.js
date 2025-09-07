import { AtpAgent } from '@atproto/api'
import { Service } from './service.js'
import servicesBundle from '../../../../services/dist/index.json'

export const CLAIM_NSID = 'me.atpub.identity.claim'
export const MEMBERSHIP_NSID = 'me.atpub.team.membership'

const services = {}
for (const [sid, sconf] of Object.entries(servicesBundle.services)) {
    services[sid] = new Service(sid, sconf)
}

export function getService(obj) {
    if (!obj) {
        return false
    }
    if (typeof obj === 'string') {
        return services[obj]
    }
    return new Service('_custom', obj, true)
}

export async function verifyClaim (did, claim) {
    if (!claim.proofs || claim.proofs.length === 0) {
        return { ok: null }
    }
    const serviceId = claim.service
    const service = services[serviceId]
    if (!service) {
        return { ok: false }
    }
    const proof = claim.proofs[0]
    const res = await service.verifyProof(did, claim, proof)
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
            collection: CLAIM_NSID,
        })).data.records
        return [{
            value: {
                $type: CLAIM_NSID,
                service: "bsky",
                identifier: this.profile.handle,
                proofs: [{ method: "profile" }]
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
            collection: MEMBERSHIP_NSID
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