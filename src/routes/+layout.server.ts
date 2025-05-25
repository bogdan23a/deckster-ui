import { getDecksPage } from "$lib/server/db";
import type { PageServerLoad } from "./$types";
import { env } from "$env/dynamic/private";


export const load: PageServerLoad = async (event) => {
	return {
		session: await event.locals.auth(),
		decks: await getDecksPage(),
		env: env.ENVIRONMENT
	};
};