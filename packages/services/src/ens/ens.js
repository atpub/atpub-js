import { Service } from '../../service.js';
import icon from './ens.svg';

export default new Service('ens', {
    name: "ENS",
    urlPattern: 'https://app.ens.domains/{identifier}',
    icon,
    verificationMethods: {
        'txt-record': async ({ did, claim, proof }) => {
            const gist = await (await fetch(`https://api.github.com/gists/${proof.gistId}`)).json()
            for (const [_, file] of Object.entries(gist.files)) {
                //console.log(file.content, `did=${did}`)
                if (file.content.includes(`did=${did}`)) {
                    return true
                }
            }
            return false
        }
    }
})

