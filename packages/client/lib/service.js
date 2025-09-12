import provers from './provers'

export class Service {
    constructor(id, config, custom = false) {
        this.id = id
        this.custom = custom
        this.config = Object.assign({
            profileUrlTemplate: 'https://{identifier}'
        }, config)
    }

    name() {
        return this.config.name
    }

    identityUrl(identifier) {
        return this.config.profileUrlTemplate.replace('{identifier}', identifier)
    }

    identifierRender(str) {
        const ident = this.config.identifier?.renderFormat ? (this.config.identifier.renderFormat.replace('{identifier}', str)) : str
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

        const base = {
            did,
            service: claim.service,
            method: input.method,
            time: (new Date()).toISOString()
        }
        const finish = (ok) => ({ ok, ...base  })

        const params = this.config.verificationMethods[input.method]
        if (!params) {
            return finish(false)
        }
        const prover = provers[params.type]
        if (!prover) {
            return finish(false)
        }

        const result = await prover({ did, claim, input, params})
        return Object.assign(result, base)
    }
}