import { Service } from '../../service.js';
import icon from './github.svg';

export default new Service('github', {
    name: "GitHub",
    urlPattern: 'https://github.com/{identifier}',
    icon,
    verificationMethods: {
        gist: async ({ did, claim, proof }) => {
            const proofUrl = `https://api.github.com/gists/${proof.gistId}`
            const json = await (await fetch(proofUrl)).json()
            const finish = ok => ({ ok, proofUrl })
            for (const [_, file] of Object.entries(json.files)) {
                if (file.content.includes(`did=${did}`)) {
                    return finish(true)
                }
            }
            return false
        }
    }
})

