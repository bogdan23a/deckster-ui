<script lang='ts'>
	export let data:any;
	import { page } from '$app/stores';
	import DeckList from '../lib/deck/DeckList.svelte';
	import { inview } from 'svelte-inview/dist/index';
    import { modalStore } from '@skeletonlabs/skeleton';
    import { AddDeckModal } from '$lib/deck/modal/AddDeckModal';

	let inputDemo = '';
	let decks = data.decks;
	// const handleChange = (event) => {
		// if (event.detail.inView && page['pageNumber'] + 1 !== page['totalPage']) {
			// getDecksPage(page['pageNumber'] + 1);
		// }
	// }
    const triggerAddDeckModal = () => modalStore.trigger(AddDeckModal);
</script>

<div class="container h-full mx-auto flex">
	<table class=" flex-col w-full table-auto">
		<tbody>
			<tr>
				<td>
					<input class="input my-10" type="search" name="demo" bind:value={inputDemo} placeholder="Search..." />
				</td>
				{#if $page.data.session}
					<td>
						<button type="button" class="btn-icon btn-xl variant-filled" on:click={triggerAddDeckModal}>+</button>
					</td>
				{/if}
			</tr>
			<tr class="place-content-center">
				{#await $page}
					loading...
				{:then $page}
					{#if !$page.data.decks['empty']}
						<DeckList decks={$page.data.decks.content}/>
					{/if}
				{:catch error}
					{error}
				{/await}
				<!-- <div use:inview={{}} on:change={handleChange} /> -->
			</tr>
		</tbody>
	</table>
</div>