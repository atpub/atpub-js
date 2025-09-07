import { ATpubClient } from '@atpub/client'

export const client = $state(new ATpubClient())
await client.loadServices()

export const ctx = $state({})