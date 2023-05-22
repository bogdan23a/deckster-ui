<script lang='ts'>
	import { ListBox } from '@skeletonlabs/skeleton';
    import Deck from '$lib/deck/Deck.svelte';
    export let decks:any;
</script>

<ListBox active=false>
    {#each decks as deck, index}
        {#if index % 5 == 0}
            <tr>
        {/if}
        <td><Deck {deck}/></td>
    {/each}
</ListBox>