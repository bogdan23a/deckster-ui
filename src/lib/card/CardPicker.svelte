<script lang='ts'>
	import CardOption from './CardOption.svelte';
    interface Props {
        cards: any;
        selectedCard: any;
    }

    let { cards, selectedCard }: Props = $props();
    let onClick = (card: any) => selectedCard = card
</script>

{#if cards}
    <div class="col-span-7">
        <input type="hidden" hidden bind:value={selectedCard.id} name="cardId">
        {#each cards as card}
            <CardOption {card} selected={card.content === selectedCard.content} {onClick}/>
        {/each}
    </div>
{/if}