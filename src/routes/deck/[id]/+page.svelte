<script lang='ts'>
	import CardList from '$lib/card/CardList.svelte';
	import { AddCardModal } from '$lib/card/modal/AddCardModal.js';
	import { modalStore } from '@skeletonlabs/skeleton';

    export let data;
    let deck:any = data.deck.data;
    const triggerAddCardModal = () => modalStore.trigger(AddCardModal);
</script>

<div class="container h-full mx-auto flex">
	<table class=" flex-col w-full table-auto">
		<tbody>
			<tr>
				<td>
                    <h2 class="h1">{deck['name']}</h2>
				</td>
                <td>
                    <button type="button" class="btn-icon btn-xl variant-filled" on:click={triggerAddCardModal}>+</button>
                </td>
			</tr>
			<tr class="place-content-center">
                {#await deck}
                loading...
                {:then deck}
                {#if deck !== null}
                    <CardList cards={deck['cards']}/>
                {/if}
                {:catch error}
                {error}
                {/await}
				<!-- <div use:inview={{}} on:change={handleChange} /> -->
			</tr>
		</tbody>
	</table>
</div>

