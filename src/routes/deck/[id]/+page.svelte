<script lang='ts'>
	import CardList from '$lib/card/CardList.svelte';
	import { AddCardModal } from '$lib/card/modal/AddCardModal.js';
	import { modalStore } from '@skeletonlabs/skeleton';
    import { page } from "$app/stores";

    const triggerAddCardModal = () => modalStore.trigger(AddCardModal);
    let deck:any = $page.data.decks.content.filter(deck => deck.id === $page.params.id)[0];
</script>

<div class="container mt-6 mx-auto">
    <div>
        <h2 class="h1">{deck.name}</h2>
        {#if $page.data.session}
            <button type="button" class="btn-icon btn-xl variant-filled float-right" on:click={triggerAddCardModal}>+</button>
        {/if}
    </div>
    <div class="flex-auto mt-6">
        {#await $page}
            loading...
        {:then $page}
            {#if deck.cards[0]["id"] !== undefined}
                <CardList cards={deck.cards}/>
            {/if}
        {:catch error}
            {error}
        {/await}
    </div>
</div>

