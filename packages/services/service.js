import { readFileSync } from 'fs'

export class Service {
    constructor(id, config) {
        this.id = id
        this.config = Object.assign({
            urlPattern: 'https://{identifier}'
        }, config)
    }

    name() {
        return this.config.name
    }

    identityUrl(identifier) {
        return this.config.urlPattern.replace('{identifier}', identifier)
    }

    identifierRender(str) {
        const ident = this.config.renderFormat ? (this.config.renderFormat.replace('{identifier}', str)) : str
        if (ident.length > 48) {
            return ident.substring(0,10) + '…' + ident.substring(str.length-5)
        }
        return ident
    }

    icon() {
        if (this.config.icon) {
            return this.config.icon
        }
        return null
    }

    async verifyProof(did, claim, proof) {
        const meta = { proofMethod: proof.method }
        const finish = (ok) => (Object.assign(meta, { ok }))

        const methods = this.config.verificationMethods || []
        const method = methods[proof.method]
        if (!method) {
            return finish(false)
        }
        const res = await method({ did, claim, proof })

        if (res && typeof res !== "boolean") {
            return Object.assign(res, meta)
        } else if (res) {
            return finish(res)
        } else {
            return finish(false)
        }
    }
}