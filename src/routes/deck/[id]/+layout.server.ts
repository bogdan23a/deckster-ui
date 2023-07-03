import type { LayoutServerLoad } from "./$types";
import { getDeck, getCardTypes } from "$lib/server/db";

export const load: LayoutServerLoad = async ({ params }) => {
  return {
    deck: await getDeck(params.id),
    cardTypes: await getCardTypes()
  };
};