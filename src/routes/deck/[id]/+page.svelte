<script lang='ts'>
    export let data;
    let deck:any = data.deck
</script>

<h1>{deck['name']}</h1>

{#await page}
    loading...
{:then page}
    {#if page['content'] !== null}
        <DeckList decks={page['content']}/>
    {/if}
{:catch error}
    {error}
{/await}

