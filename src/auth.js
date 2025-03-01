import { SvelteKitAuth } from "@auth/sveltekit";
import Auth0 from "@auth/sveltekit/providers/auth0";
import GitHub from "@auth/sveltekit/providers/github";
import Google from "@auth/sveltekit/providers/google";

export const { handle, signIn, signOut } = SvelteKitAuth(async (event) => {
  return {
    trustHost: true,
    providers: [
      GitHub,
      Auth0
    ],
    // secret: import.meta.env.AUTH_SECRET,
  }
})