import { getDecksPage } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    return {
        page: await getDecksPage()
    }
}