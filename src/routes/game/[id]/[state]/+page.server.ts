import type { PageServerLoad } from "./$types";
import { getGame, getTask, sendEvent } from "$lib/server/db";
import { redirect, type Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
  let { params } = event;
  let session = await event.locals.auth();
  let game = await getGame(session?.user?.email || '', params.id);
  if (params.state !== game.state) {
    redirect(303, `/game/${params.id}/${game.state}`)
  }
  if (!game.players.map((player: { email: any; }) => player.email).includes(session?.user?.email)) {
    let message = { game_id: params.id || '', email: session?.user?.email || '', deck_id: '', card_id: '' };
    await sendEvent(message, "JOIN");
  }
  const task = await getTask(params.id, params.state, session?.user?.email || '');
  return {
    session,
    game,
    task, 
  };
}

export const actions = {
  SET_GAME: async(event) => {
    let { params } = event;
    let session = await event.locals.auth();
    let message = { game_id: params.id || '', email: session?.user?.email || '', deck_id: '', card_id: ''};
    let newState = await sendEvent(message, "SET_GAME");
    redirect(303, `/game/${params.id}/${newState.state}`);
  },
  GAME_SET: async(event) => {
    let { params, request } = event;
    let formData = await request.formData();
    let deckId = formData.get("deckId");
    console.log(...formData);
    let session = await event.locals.auth();
    let message = { game_id: params.id || '', email: session?.user?.email || '', deck_id:  deckId?.toString() || '', card_id: ''};
    let newState = await sendEvent(message, "GAME_SET");
    redirect(303, `/game/${params.id}/${newState.state}`);
  },
  RESPOND: async(event) => {
    let { params, request } = event;
    let cardId = (await request.formData()).get("cardId");
    console.log("Card:", cardId);
    let session = await event.locals.auth();
    let message = { game_id: params.id || '', email: session?.user?.email || '', deck_id: '', card_id: cardId?.toString() || '' };
    let newState = await sendEvent(message, "RESPOND");
    redirect(303, `/game/${params.id}/${newState.state}`);
  },
  PICK_WINNER: async(event) => {
    let { params, request } = event;
    let cardId = (await request.formData()).get("cardId");
    let session = await event.locals.auth();
    let message = { game_id: params.id || '', email: session?.user?.email || '', deck_id: '', card_id: cardId?.toString() || '' };
    let newState = await sendEvent(message, "PICK_WINNER");
    redirect(303, `/game/${params.id}/${newState.state}`);
  }
} satisfies Actions