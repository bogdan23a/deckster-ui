import { saveDeck } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from "./$types";
import { getDecksPage } from "$lib/server/db";

export const load: PageServerLoad = async (event) => {
  return {
    session: await event.locals.auth(),
    decks: await getDecksPage()
  };
};

/** @type {import('./$types').Actions} */
export const actions = {
    save: async ({ request }) => {
        const data = await request.formData();
        let form_data = data.entries();
        var obj = form_data.next();
        var retrieved = {};
        while (undefined !== obj.value) {
            retrieved[obj.value[0]] = obj.value[1];
            obj = form_data.next();
        }
        const deck = await saveDeck(retrieved);
        redirect(303, "/deck/" + deck.id);
    }
}