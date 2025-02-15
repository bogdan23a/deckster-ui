<script>
    let { task } = $props();
    let { display, events } = task;
</script>

{#each Object.keys(display) as title}
    <h1>{title}</h1>
    {#if display[title].input_type === "LIST"}
        {#each Object.keys(display[title].values) as item}
            <li>{display[title].values[item].email}</li>
        {/each}
    {/if}
{/each}
{#each events as event}
    <button class="btn">{event}</button>
{/each}