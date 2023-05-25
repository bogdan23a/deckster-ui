import { saveDeck } from '$lib/server/db.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const body = await request.json();

    const { id } = await saveDeck(body);
    return json({ id }, { status: 201 });
}