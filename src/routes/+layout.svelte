<script lang='ts'>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	const env = import.meta.env.VITE_DECKMASTER_ENVIRONMENT;
	const envColor = import.meta.env.VITE_DECKMASTER_ENVIRONMENT_COLOR;
	const swaggerUi = import.meta.env.VITE_SWAGGER_API;
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end" background="bg-emerald-950	" >
			<svelte:fragment slot="lead">(icon)</svelte:fragment>
			<strong class="text-xl capitalize">
				<a 
				    href="/"
				>
					Deckmaster {env}
				</a>
			</strong>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface"
					href={swaggerUi}
					target="_blank"
					rel="noreferrer"
				>
					API
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/techhuntstudio/deckmaster"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="/decks"
					target="_blank"
					rel="noreferrer"
				>
					Login
				</a>
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
