import { getDecksPage } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        page: {
            data: await getDecksPage(0)
        }
    }
}