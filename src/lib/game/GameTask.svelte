<script>
	import CardList from "$lib/card/CardList.svelte";
	import DeckList from "$lib/deck/DeckList.svelte";

    let { task } = $props();
    let { display, events } = task;
    console.log(display);
</script>

{#each Object.keys(display) as title}
    <h1>{title}</h1>
    {#if display[title] === null}
        <div></div>
    {:else}
        {#if display[title].input_type === "LIST"}
            {#each Object.keys(display[title].values) as item}
                <li>{display[title].values[item].email}</li>
            {/each}
        {/if}
        {#if display[title].input_type === "PROMPT"}
            <p>{display[title].values[0].content}</p>
        {/if}
        {#if display[title].input_type === "DECK_PICKER"}
            <DeckList decks={display[title].values}/>
        {/if}
        {#if display[title].input_type === "CARD_PICKER"}
            <CardList cards={display[title].values}/>
        {/if}
    {/if}
{/each}
{#each events as event}
    <button class="btn" value={event} type="submit" formaction="?/{event}">{event.replace("_", " ")}</button>
{/each}