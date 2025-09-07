import provers from './provers'

export class Service {
    constructor(id, config, custom = false) {
        this.id = id
        this.custom = custom
        this.config = Object.assign({
            profileUrl: 'https://{identifier}'
        }, config)
    }

    name() {
        return this.config.name
    }

    identityUrl(identifier) {
        return this.config.profileUrl.replace('{identifier}', identifier)
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

    async verifyProof(did, claim, input) {
        const finish = (ok) => ({ ok, proofMethod: input.method })

        const params = this.config.verificationMethods[input.method]
        if (!params) {
            return finish(false)
        }
        const prover = provers[params.type]
        if (!prover) {
            return finish(false)
        }

        const result = await prover({ did, claim, input, params})
        return finish(result)

        /*const meta = { proofMethod: proof.method }
        console.log(meta)

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
        }*/
    }
}