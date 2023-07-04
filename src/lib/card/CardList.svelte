<script lang='ts'>
    import Card from '$lib/card/Card.svelte';
    export let cards:any;
</script>

{#if cards}
    <div class="grid grid-cols-5 gap-1">
        {#each cards as card}
            <Card {card}/>
        {/each}
    </div>
{/if}