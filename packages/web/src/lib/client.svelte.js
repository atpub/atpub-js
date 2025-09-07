import { ATpubClient } from '@atpub/client'

export const client = $state(new ATpubClient())

//const localServicesBundle = await import('../../../../../services/dist/index.json')
//await client.loadServices(localServicesBundle)
await client.loadServices()

export const ctx = $state({})