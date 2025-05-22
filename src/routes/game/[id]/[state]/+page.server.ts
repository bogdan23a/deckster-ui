import type { PageServerLoad } from "./$types";
import { getGame, getTask, sendEvent, websocketUri } from "$lib/server/db";
import { redirect, type Actions } from "@sveltejs/kit";
import { Client } from "@stomp/stompjs";
import { goto } from "$app/navigation";

export const load: PageServerLoad = async (event) => {
  let { params } = event;
  let session = await event.locals.auth();
  let game = await getGame(session?.user?.email || '', params.id);
  if (params.state !== game.state) {
    redirect(303, `/game/${params.id}/${game.state}`)
  }
  if (!game.players.map((player: { email: any; }) => player.email).includes(session?.user?.email)) {
    let message = { game_id: params.id || '', email: session?.user?.email || '', deck_id: '', card_ids: '', response_group: '' };
    await sendEvent(message, "JOIN");
  };

  const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time));

  const refresh = async () => {
    await sleep(100).then(() => {
        goto(`/refresh/${game.id}/${game.state}`);
    });
  };

  // const connectToWs = () => {
  const client = new Client({
    brokerURL: websocketUri,
    debug: function (message) {
        console.log(message);
    }
  });
  client.onConnect = (frame) => {
      console.log("Connected to ws", frame)
      client.subscribe('/public', refresh);
  }
  client.onStompError = (frame) => {
      console.log("error", frame)
  }
  client.activate();
  // };

  const task = await getTask(params.id, params.state, session?.user?.email || '');
  return {
    session,
    game,
    task
  };
}

export const actions = {
  SET_GAME: async(event) => {
    let { params } = event;
    let session = await event.locals.auth();
    let message = { game_id: params.id || '', email: session?.user?.email || '', deck_id: '', card_ids: '', response_group: '' };
    let newState = await sendEvent(message, "SET_GAME");
    redirect(303, `/game/${params.id}/${newState.state}`);
  },
  GAME_SET: async(event) => {
    let { params, request } = event;
    let formData = await request.formData();
    let deckId = formData.get("deckId");
    let session = await event.locals.auth();
    let message = { game_id: params.id || '', email: session?.user?.email || '', deck_id:  deckId?.toString() || '', card_ids: '', response_group: '' };
    let newState = await sendEvent(message, "GAME_SET");
    redirect(303, `/game/${params.id}/${newState.state}`);
  },
  RESPOND: async(event) => {
    let { params, request } = event;
    let cardIds = (await request.formData()).get("cardIds[]");
    let session = await event.locals.auth();
    let message = { game_id: params.id || '', email: session?.user?.email || '', deck_id: '', card_ids: cardIds?.toString() || '', response_group: '' };
    let newState = await sendEvent(message, "RESPOND");
    redirect(303, `/game/${params.id}/${newState.state}`);
  },
  PICK_WINNER: async(event) => {
    let { params, request } = event;
    let formData = await request.formData()
    let responseGroup = formData.get("responseGroup");
    console.log("Response", responseGroup);
    let session = await event.locals.auth();
    let message = { game_id: params.id || '', email: session?.user?.email || '', deck_id: '', card_ids: '', response_group: responseGroup?.toString() || '' };
    let newState = await sendEvent(message, "PICK_WINNER");
    redirect(303, `/game/${params.id}/${newState.state}`);
  }
} satisfies Actions