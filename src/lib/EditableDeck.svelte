<script lang='ts'>
	import { goto } from '$app/navigation';
    import { ListBoxItem, type PopupSettings } from '@skeletonlabs/skeleton';
    import { popup } from '@skeletonlabs/skeleton';
	let valueSingle = 'books';
    let card_types = new Map([
        ["black", 1],
        ["white", 1]]);
    export let deck: any;
    const deleteDeck = () => {
        fetch(import.meta.env.VITE_DECKMASTER_URI + "/deck", {
            method: 'DELETE',
            body: JSON.stringify(deck),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(() => goto(window.location))
    } 
    const popupClick: PopupSettings = {
	    event: 'click',
	    target: 'popupClick',
	    placement: 'top',
    };
</script>

<ListBoxItem bind:group={valueSingle} name="medium" value="books">
    <button class="block card card-hover p-4" use:popup={popupClick}>
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
    </button>

    <div class="p-4 variant-filled-surface" data-popup="popupClick">
        <div class="grid grid-cols-1 gap-2">
            <button id="wont-close" class="btn variant-filled-warning">Edit</button>
            <button id="wont-close" class="btn variant-filled-error" on:click={deleteDeck}>Delete</button>
        </div>
        <div class="arrow bg-surface-100-800-token" />
    </div>
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
        font-family:  Neue LT,-apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,sans-serif;
        font-weight: 400;
        font-size: 20px;
        line-height: 26px;
	}
</style>
