<script lang='ts'>
	import { page } from '$app/stores';
	import DeckList from '../lib/deck/DeckList.svelte';
	import { inview } from 'svelte-inview/dist/index';
    import { modalStore } from '@skeletonlabs/skeleton';
    import { AddDeckModal } from '$lib/deck/modal/AddDeckModal';
	interface Props {
		data: any;
	}

	let { data }: Props = $props();

	let inputDemo = '';
	let decks = data.decks;
	// const handleChange = (event) => {
		// if (event.detail.inView && page['pageNumber'] + 1 !== page['totalPage']) {
			// getDecksPage(page['pageNumber'] + 1);
		// }
	// }
    const triggerAddDeckModal = () => modalStore.trigger(AddDeckModal);
</script>

<div class="container mt-6 mx-auto">
	<div>
		{#if $page.data.session}
			<button type="button" class="btn-icon btn-xl variant-filled float-right" onclick={triggerAddDeckModal}>+</button>
		{/if}
	</div>
	<div class="flex-auto mt-6">
		{#await $page}
			loading...
		{:then $page}
			{#if !$page.data.decks['empty']}
				<DeckList decks={$page.data.decks.content}/>
			{/if}
		{:catch error}
			{error}
		{/await}
	</div>
</div>