<script>
	import CardList from "$lib/card/CardList.svelte";
	import CardPicker from "$lib/card/CardPicker.svelte";
	import ScoreCard from "$lib/card/ScoreCard.svelte";
	import DeckList from "$lib/deck/DeckList.svelte";

    let { task } = $props();
    let { display, events } = task;
</script>

<div class="m-4">
    {#each Object.keys(display) as title}
        <p>
            {title}:
            {#if display[title].input_type === "LINK"}
                <button class="btn hover:border-t-cyan-200" onclick={() => navigator.share()}>share</button>
            {/if}
        </p>
        {#if display[title].input_type === "LIST"}
            <h1>{console.log(display[title])}</h1>
            {#each Object.keys(display[title].values) as item}
                <li>{display[title].values[item].email}</li>
            {/each}
        {/if}
    {/each}
</div>
<div class="grid grid-cols-8 m-4">
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
<div class="m-4">
    {#each Object.keys(display) as title}
        {#if display[title].input_type === "DECK_PICKER"}
            <DeckList decks={display[title].values}/>
        {/if}
        {#if display[title].input_type === "SCORE"}
            <ScoreCard players={display[title].values} />
        {/if}
    {/each}
</div>
{#each events as event}
    <button class="btn btn-primary bg-white border-black border-2 rounded-xl p-4 hover:boder-4 hover:font-bold m-4" value={event} type="submit" formaction="?/{event}">{event.replace("_", " ")}</button>
{/each}