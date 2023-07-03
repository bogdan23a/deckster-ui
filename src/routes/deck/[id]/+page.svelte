<script lang='ts'>
	import CardList from '$lib/card/CardList.svelte';
	import { AddCardModal } from '$lib/card/modal/AddCardModal.js';
	import { modalStore } from '@skeletonlabs/skeleton';
    import { page } from "$app/stores";

    const triggerAddCardModal = () => modalStore.trigger(AddCardModal);
    let deck:any = $page.data.decks.content.filter(deck => deck.id === $page.params.id)[0];
</script>

<div class="container h-full mx-auto flex">
	<table class=" flex-col w-full table-auto">
		<tbody>
			<tr>
				<td>
                    <h2 class="h1">{deck.name}</h2>
				</td>
                <td>
                    <button type="button" class="btn-icon btn-xl variant-filled" on:click={triggerAddCardModal}>+</button>
                </td>
			</tr>
			<tr class="place-content-center">
                {#await $page}
                    loading...
                {:then $page}
                {#if deck.cards[0]["id"] !== undefined}
                    <CardList cards={deck.cards}/>
                {/if}
                {:catch error}
                {error}
                {/await}
				<!-- <div use:inview={{}} on:change={handleChange} /> -->
			</tr>
		</tbody>
	</table>
</div>

