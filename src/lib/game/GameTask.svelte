<script>
	import CardList from "$lib/card/CardList.svelte";
	import CardPicker from "$lib/card/CardPicker.svelte";
	import DeckList from "$lib/deck/DeckList.svelte";

    let { task } = $props();
    let { display, events } = task;
</script>

<div class="grid grid-cols-8">
    {#each Object.keys(display) as title}
        {#if display[title].input_type == "PROMPT"}
            <CardList cards={display[title].values}/>
        {/if}
    {/each}
    {#each Object.keys(display) as title}
        {#if display[title].input_type === "CARD_PICKER"}
            <CardPicker cards={display[title].values} selectedCard={display[title].values[0]}/>
        {/if}
    {/each}
</div>
{#each Object.keys(display) as title}
    {#if display[title] === null}
        <div></div>
    {:else}
        {#if display[title].input_type === "LIST"}
            {#each Object.keys(display[title].values) as item}
                <li>{display[title].values[item].email}</li>
            {/each}
        {/if}
        {#if display[title].input_type === "DECK_PICKER"}
            <DeckList decks={display[title].values}/>
        {/if}
        {#if display[title].input_type === "SCORE"}
            {#each Object.keys(display[title].values) as item}
                <!-- <Card card={ type= type }/> -->
                <p>{display[title].values[item].first}: {display[title].values[item].second} {display[title].values[item].second == 1 ? 'point' : 'points'}</p>
            {/each}
        {/if}
    {/if}
{/each}
{#each events as event}
    <button class="btn btn-primary bg-white border-black border-2 rounded-xl p-4 hover:boder-4 hover:font-bold" value={event} type="submit" formaction="?/{event}">{event.replace("_", " ")}</button>
{/each}