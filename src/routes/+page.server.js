import { getDecksPage, saveDeck } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        decks: await getDecksPage(0)
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    save: async ({ request }) => {
        const data = await request.formData();
        const deck = await saveDeck(data);
        throw redirect(303, "/deck/" + deck.id);
    }
}