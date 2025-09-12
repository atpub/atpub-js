//import ATpubSpec from '../../../../spec'
import ATpubSpec from '@atpub/spec'
import { AtpAgent } from '@atproto/api'
import { Service } from './service.js'
import Ajv from "ajv"
import addFormats from "ajv-formats"
import betterAjvErrors from 'better-ajv-errors'

export const spec = ATpubSpec

export const CLAIM_NSID = 'me.atpub.identity.claim'
export const MEMBERSHIP_NSID = 'me.atpub.team.membership'

export class ATpubUserAgent {
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

export class ATpubClient {

    constructor() {
        this.services = null
        this.servicesBundle = null
        this.ATpubUserAgent = ATpubUserAgent
        this.spec = ATpubSpec
        this.ajv = new Ajv({ schemas: Object.values(spec.schema) })
        addFormats(this.ajv)
        this.validators = {}
    }

    async loadServices(src = 'https://services.atpub.me') {
        this.services = {}
        this.servicesBundle = typeof src === 'object' ? src : await (await fetch(src)).json()
        for (const [sid, sconf] of Object.entries(this.servicesBundle.services)) {
            this.services[sid] = new Service(sid, sconf)
        }
        return true
    }

    validate (model = 'claim', item) {
        if (!this.validators[model] && this.spec.schema[model]) {
            this.validators[model] = this.ajv.compile(this.spec.schema[model])
        }
        const validator = this.validators[model]
        if (!validator) {
            return { ok: null }
        }
        return { ok: validator(item), errors: betterAjvErrors(this.spec.schema[model], item, validator.errors, { format: 'js' }) }
    }

    getService (obj) {
        if (!obj) {
            return false
        }
        if (typeof obj === 'string') {
            return this.services[obj]
        }
        return new Service('_custom', obj, true)
    }

    async verifyClaim (did, claim) {
        if (!claim.proofs || claim.proofs.length === 0) {
            return { ok: null }
        }

        const service = this.getService(claim.service)

        if (!service) {
            return { ok: false }
        }
        const proof = claim.proofs[0]
        if (!proof) {
            return { ok: false }
        }
        return service.verifyProof(did, claim, proof)
    }

}