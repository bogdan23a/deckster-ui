import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/sveltekit/providers/github";

export const { handle, signIn, signOut } = SvelteKitAuth(async (event) => {
  return {
    trustHost: true,
    providers: [
      GitHub({
        clientId: import.meta.env.VITE_GITHUB_ID,
        clientSecret: import.meta.env.VITE_GITHUB_SECRET
      })
    ],
    // secret: import.meta.env.AUTH_SECRET,
  }
})