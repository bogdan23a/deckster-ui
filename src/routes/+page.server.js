import { saveDeck } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    save: async ({ request }) => {
        const data = await request.formData();
        const form_data = data.entries().next();
        console.log(form_data);
        const deck = await saveDeck(form_data);
        throw redirect(303, "/deck/" + deck.id);
    }
}