<script lang='ts'>
	import { page } from '$app/stores';
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, AppBar, LightSwitch, Modal, type ModalComponent } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { signIn, signOut } from '@auth/sveltekit/client';
	
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	const env = import.meta.env.VITE_DECKMASTER_ENVIRONMENT;
	const swaggerUi = import.meta.env.VITE_SWAGGER_API;
</script>

<svelte:head>
	<title>Deckmaster {env}</title>
</svelte:head>
<Modal/>
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end" background="bg-gray-950 dark:bg-gray-100">
			<svelte:fragment slot="lead">(icon)</svelte:fragment>
			<strong class="text-xl capitalize text-gray-100 dark:text-gray-950">
				<a 
				    href="/"
				>
					Deckmaster {env}
				</a>
			</strong>
			<svelte:fragment slot="trail">
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
						/>
					{/if}
					<span class="signedInText">
						<small class="text-gray-100 dark:text-gray-950">Signed in as</small><br />
						<strong class="text-gray-100 dark:text-gray-950">{$page.data.session.user?.name ?? "User"}</strong>
					</span>
					<button on:click={() => signOut()} class="btn btn-sm variant-ghost-surface text-gray-100 dark:text-gray-950">Sign out</button>
				{:else}
					<span class="notSignedInText text-gray-100 dark:text-gray-950">You are not signed in</span>
					<button class="btn btn-sm variant-ghost-surface text-gray-100 dark:text-gray-950" on:click={() => signIn("github")}>Sign In with GitHub</button>
				{/if}
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
