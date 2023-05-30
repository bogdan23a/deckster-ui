import { getDeck, saveCard } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    return {
        deck: {
            data: await getDeck(params.id)
        }
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    save: async ({ request }) => {
        const data = await request.formData();
        console.log(data);
        return await saveCard(data);
    }
}