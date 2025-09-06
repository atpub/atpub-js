import { json } from '@sveltejs/kit'
import clientMetadata from '$lib/client-metadata.json'

export async function GET() {
	return json(clientMetadata)
}