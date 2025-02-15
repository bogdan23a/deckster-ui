import type { PageServerLoad } from "./$types";
import { getGame, getTask } from "$lib/server/db";

export const load: PageServerLoad = async (event) => {
  let { params } = event;
  let session = await event.locals.auth();
  return {
    session: await event.locals.auth(),
    game: await getGame(session?.user?.email || '', params.id),
    task: await getTask(params.id, params.state)
  };
}