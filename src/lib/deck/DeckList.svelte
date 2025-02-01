<script lang='ts'>
    import Deck from '$lib/deck/Deck.svelte';
    let { decks } = $props();
</script>

<tr class="grid grid-cols-5 gap-1">
    {#each decks as deck}
        <td><Deck {deck}/></td>
    {/each}
</tr>