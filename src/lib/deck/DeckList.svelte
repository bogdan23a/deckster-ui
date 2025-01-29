<!-- @migration-task Error while migrating Svelte code: Unexpected block closing tag
https://svelte.dev/e/block_unexpected_close -->
<script lang='ts'>

    import Deck from '$lib/deck/Deck.svelte';
    export let decks:any;
</script>

<div class="grid grid-cols-5 gap-1">
    {#each decks as deck}
        <td><Deck {deck}/>
    {/each}
</div>