<script lang='ts'>
	import { ListBox } from '@skeletonlabs/skeleton';
    import Card from '$lib/card/Card.svelte';
    export let cards:any;
    console.log(cards);
</script>

{#if cards !== undefined}
    <ListBox active=false>
        {#each cards as card, index}
            {#if index % 5 == 0}
                <tr>
            {/if}
            <td><Card {card}/></td>
        {/each}
    </ListBox>
{/if}