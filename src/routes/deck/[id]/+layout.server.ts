import type { LayoutServerLoad } from "./$types";
import { getDeck, getCardTypes } from "$lib/server/db";

export const load: LayoutServerLoad = async (event) => {
  let { params } = event;
  return {
    session: await event.locals.auth(),
    deck: await getDeck(params.id),
    cardTypes: await getCardTypes()
  };
};