<script>
// @ts-nocheck

    import { ListBoxItem } from '@skeletonlabs/skeleton';
	let valueSingle = 'books';
    let card_types = new Map([
        ["black", 1],
        ["white", 1]]);
    export let deck;
</script>

<ListBoxItem bind:group={valueSingle} name="medium" value="books">
    <a class="block card card-hover p-4" href="/deck">
        <header class="card-header">{deck['name']}</header>
        <section class="p-4"></section>
        <footer class="card-footer bottom-0">
            {#each [...card_types] as [type, count]}
                <p>{count} {type} 
                    {#if count == 1} 
                        card 
                    {:else} 
                        cards
                    {/if}
                </p>
            {/each}
        </footer>
    </a>
</ListBoxItem>

<style lang="postcss">
	.card {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
        width: 250px;
        height: 350px;
        border-color: rgb(255, 255, 255);
        border-style: solid;
        border-width: 2px;
        border-radius: 13px;
        background-color: rgb(0, 0, 0) !important;
        color: rgb(255, 255, 255);
	}
</style>
