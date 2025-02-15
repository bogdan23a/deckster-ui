<script lang='ts'>
	import DeckList from '../lib/deck/DeckList.svelte';
    import { AddDeckModal } from '$lib/deck/modal/AddDeckModal';
	import type { PageProps } from './$types';
	import { Modal } from '@skeletonlabs/skeleton-svelte';

	let openState = $state(false);

	function modalClose() {
		openState = false;
	}

	let { data }: PageProps = $props();

	let inputDemo = '';
	// const handleChange = (event) => {
		// if (event.detail.inView && page['pageNumber'] + 1 !== page['totalPage']) {
			// getDecksPage(page['pageNumber'] + 1);
		// }
	// }
    // const triggerAddDeckModal = () => modalStore.trigger(AddDeckModal);
	// console.log(data.session.user);
</script>

<div class="container mt-6 mx-auto">
	<div>
		{#if data.session}

		<Modal bind:open={openState}
			triggerBase="btn preset-tonal"
			contentBase="card bg-surface-100-900 p-4 space-y-4 shadow-xl max-w-screen-sm"
			backdropClasses="backdrop-blur-sm">

			{#snippet trigger()}
			+
			{/snippet}
			{#snippet content()}
			<div class="modal-example-form card p-4 w-modal shadow-xl space-y-4">
				<header class="text-2xl font-bold">Add A New Deck</header>
				<!-- <article>{$modalStore[0].body ?? '(body missing)'}</article> -->
				<!-- Enable for debugging: -->
				<form class="modal-form border border-surface-500 p-4 space-y-4 rounded-container-token" action="?/save" method="POST" use:enhance={() => {
					return async ({ update }) => {
						await update();
						// modalStore.close();
					}
				}}>
					<label class="label">
						<span>Name</span>
						<input class="input" type="text" placeholder="Enter name..." name="name" required/>
					</label>
					<!-- prettier-ignore -->
					<footer class="modal-footer">
						<button class="btn" onclick={modalClose}>Close</button>
						<button class="btn">Submit</button>
					</footer>
				</form>
			</div>
			{/snippet}

		</Modal>
			<!-- <button type="button" class="btn-icon btn-xl variant-filled float-right">+</button> -->
		{/if}
	</div>
	<div class="flex-auto mt-6">
		{#await data}
			loading...
		{:then data}
			<!-- {#if !data.decks['empty']} -->
				<DeckList decks={data.decks}/>
			<!-- {/if} -->
		{:catch error}
			{error}
		{/await}
	</div>
</div>