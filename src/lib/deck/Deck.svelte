<script lang='ts'>
    export let deck: any;
    import { ListBoxItem } from '@skeletonlabs/skeleton';
	let valueSingle = 'books';
    let grouped_cards = deck["cards"].reduce((grouped_cards:any, card:any) => {
        const group = (grouped_cards[card.card_type] || []);
        group.push(card);
        grouped_cards[card.card_type] = group;
        return grouped_cards;
    }, {});
    let groups = deck["cards"].reduce((curr:any, val:any) => {
        let group = curr.find(g => g['card_type'] === `${val['card_type']}`)
        if (group) {
            group.values = group.values + 1;
        } else {
            curr.push({ card_type: `${val['card_type']}`, values: 1 }) 
        }
        return curr
    }, [])
    let card_types = new Map([
        ["black", 0],
        ["white", 0]]);
</script>

<ListBoxItem bind:group={valueSingle} name="medium" value="books">
    <a class="block card card-hover p-4" href="/deck/{deck['id']}">
        <header class="card-header">{deck['name']}</header>
        <section class="p-4"></section>
        <footer class="card-footer bottom-0">
            {#each [...groups] as [card_type, count]}
                <p>{count} {card_type} 
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
        font-family:  Neue LT,-apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,sans-serif;
        font-weight: 400;
        font-size: 20px;
        line-height: 26px;
	}
</style>
