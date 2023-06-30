import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/core/providers/github";

export const handle = SvelteKitAuth({
  providers: [GitHub({ clientId: import.meta.env.VITE_GITHUB_ID, clientSecret: import.meta.env.VITE_GITHUB_SECRET })],
});