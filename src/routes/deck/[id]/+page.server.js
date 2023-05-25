import { getDeck, saveDeck } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    return {
        deck: {
            data: await getDeck(params.id)
        }
    }
}

export const actions = {
    save: async (deck) => {
    return {
        deck: {
            data: await saveDeck(deck)
        }}
    }
}