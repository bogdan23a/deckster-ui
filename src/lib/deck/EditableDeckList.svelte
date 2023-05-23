<script lang='ts'>
        import { ListBox,  } from '@skeletonlabs/skeleton';
        import EditableDeck from '$lib/deck/EditableDeck.svelte';
        export let decks: any;
    </script>
    
    <ListBox active=false>
        {#each decks as deck, index}
            {#if index % 5 == 0}
                <tr>
            {/if}
            <td><EditableDeck {deck}/></td>
        {/each}
    </ListBox>