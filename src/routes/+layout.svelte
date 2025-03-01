<script lang='ts'>
	import "../app.css";
	import { AppBar, Modal } from '@skeletonlabs/skeleton-svelte'
	import { signIn, signOut } from '@auth/sveltekit/client';
	import AddDeck from "$lib/deck/AddDeck.svelte";
	import { SignIn } from "@auth/sveltekit/components";
	import { page } from "$app/stores";

	let { children, data } = $props();
	
	// storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	const env = import.meta.env.VITE_DECKMASTER_ENVIRONMENT;
	const swaggerUi = import.meta.env.VITE_SWAGGER_API;
</script>

<svelte:head>
	<title>Deckster {env}</title>
</svelte:head>

<AppBar background="bg-gray-950 dark:bg-gray-400">
	{#snippet lead()}
		(icon)
	{/snippet}
	<strong class="text-xl capitalize text-gray-100 dark:text-gray-950">
		<a 
			href="/"
		>
			Deckster {env}
		</a>
	</strong>
	{#snippet trail()}
		<a
			class="btn btn-sm variant-ghost-surface text-gray-100 dark:text-gray-950"
			href={swaggerUi}
			target="_blank"
			rel="noreferrer"
		>
			API
		</a>
		<a
			class="btn btn-sm variant-ghost-surface text-gray-100 dark:text-gray-950"
			href="https://github.com/techhuntstudio/deckmaster"
			target="_blank"
			rel="noreferrer"
		>
			GitHub
		</a>

		{#if $page.data.session}
			{#if $page.data.session.user?.image}
				<span
					style="background-image: url('{$page.data.session.user.image}')"
					class="avatar"
				></span>
			{/if}
			<span class="signedInText">
				<small class="text-gray-100 dark:text-gray-950">Signed in as</small><br />
				<strong class="text-gray-100 dark:text-gray-950">{$page.data.session?.user?.name ?? "User"}</strong>
			</span>
			<button onclick={() => signOut()} class="btn btn-sm variant-ghost-surface text-gray-100 dark:text-gray-950">Sign out</button>
		{:else}
			<span class="notSignedInText text-gray-100 dark:text-gray-950">You are not signed in</span>
			<SignIn>
				<div class="btn btn-sm variant-ghost-surface text-gray-100 dark:text-gray-950" slot="submitButton">Sign In with GitHub</div>
			</SignIn>
		{/if}

	{/snippet}
</AppBar>

{@render children()}