import { getDecksPage } from "$lib/server/db";
import type { PageServerLoad } from "./$types";
import { VITE_DECKSTER_ENVIRONMENT } from "$env/static/private";


export const load: PageServerLoad = async (event) => {
	return {
		session: await event.locals.auth(),
		decks: await getDecksPage(),
		env: VITE_DECKSTER_ENVIRONMENT
	};
};