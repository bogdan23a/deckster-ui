import type { LayoutServerLoad } from "./$types";
import { getDecksPage } from "$lib/server/db";

export const load: LayoutServerLoad = async (event) => {
  return {
    session: await event.locals.auth(),
    decks: await getDecksPage()
  };
};