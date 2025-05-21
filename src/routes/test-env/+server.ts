import { json } from '@sveltejs/kit';

export async function GET({ request }) {
  console.log("Origin ", request.headers.get("origin"));
  console.log("Host ",request.headers.get("host"));
  return json({
    origin: request.headers.get('origin'),
    host: request.headers.get('host'),
    env: {
      AUTH_ORIGIN: process.env.AUTH_ORIGIN,
      AUTH_SECRET: process.env.AUTH_SECRET?.length,
      GITHUB_ID: process.env.AUTH_GITHUB_ID,
    }
  });
}