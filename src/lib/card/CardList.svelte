<script lang='ts'>
    import Card from '$lib/card/Card.svelte';
    interface Props {
        cards: any;
    }

    let { cards }: Props = $props();
</script>

{#if cards}
    <div class="grid grid-cols-5 gap-1">
        <select name="cardId">
        {#each cards as card}
            <option value = {card.id}>{card.content}</option> 
            <!-- <Card {card}/> -->
        {/each}
        </select>
    </div>
{/if}