import { getDeck } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    return {
        deck: {
            data: await getDeck(params.id)
        }
    }
}