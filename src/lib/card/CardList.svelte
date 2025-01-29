<script lang='ts'>
    import Card from '$lib/card/Card.svelte';
    interface Props {
        cards: any;
    }

    let { cards }: Props = $props();
</script>

{#if cards}
    <div class="grid grid-cols-5 gap-1">
        {#each cards as card}
            <Card {card}/>
        {/each}
    </div>
{/if}