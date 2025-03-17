<script lang='ts'>
	import CardList from '$lib/card/CardList.svelte';
	// import { AddCardModal } from '$lib/card/modal/AddCardModal.js';
	import type { PageProps } from './$types';
    import { page } from '$app/state';

	let { data }: PageProps = $props();

    // const triggerAddCardModal = () => modalStore.trigger(AddCardModal);
    let deck:any = data.deck.filter((deck: { id: any; }) => deck.id === page.params.id)[0];
</script>

<div class="container mt-6 mx-auto">
    <div>
        <h2 class="h1">{deck.name}</h2>
        {#if data.session}
            <button type="button" class="btn-icon btn-xl variant-filled float-right">+</button>
        {/if}
    </div>
    <div class="flex-auto mt-6">
        {#await data}
            loading...
        {:then data}
            {#if deck.cards[0]["id"] !== undefined}
                <CardList cards={deck.cards}/>
            {/if}
        {:catch error}
            {error}
        {/await}
    </div>
</div>

