import type { PageServerLoad } from "./$types";
import { getGame, getTask, sendEvent } from "$lib/server/db";
import { redirect, type Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
  let { params } = event;
  let session = await event.locals.auth();
  let game = await getGame(session?.user?.email || '', params.id);
  // console.log(game);
  if (params.state !== game.state) {
    redirect(303, `/game/${params.id}/${game.state}`)
  }
  return {
    session: await event.locals.auth(),
    game: game,
    task: await getTask(params.id, params.state, session?.user?.email || '')
  };
}

export const actions = {
  SET_GAME: async(event) => {
    let { params } = event;
    let session = await event.locals.auth();
    let newState = await sendEvent({ game_id: params.id || '', email: session?.user?.email || '', deck_id: ''}, "SET_GAME");
    redirect(303, `/game/${params.id}/${newState.state}`)
  },
  GAME_SET: async(event) => {
    let { params, request } = event;
    let deckId = (await request.formData()).get("deckId");
    let session = await event.locals.auth();
    let message = { game_id: params.id || '', email: session?.user?.email || '', deck_id:  deckId?.toString() || '' };
    let newState = await sendEvent(message, "GAME_SET");
    redirect(303, `/game/${params.id}/${newState.state}`)
  },
  RESPONDED: async(event) => {
    let { params, request } = event;
    let cardId = (await request.formData()).get("cardId");
    let session = await event.locals.auth();
    let message = { game_id: params.id || '', email: session?.user?.email || '', deck_id: '', card_id: cardId?.toString() || '' };
    let newState = await sendEvent(message, "GAME_SET");
    redirect(303, `/game/${params.id}/${newState.state}`)
  }
} satisfies Actions