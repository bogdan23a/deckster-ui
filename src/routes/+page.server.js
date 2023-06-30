import { getDecksPage } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        decks: await getDecksPage(0)
    }
}