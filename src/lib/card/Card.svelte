<script lang='ts'>
    import { ListBoxItem } from '@skeletonlabs/skeleton';
    import { page } from '$app/stores';
	let valueSingle = 'books';
    let card_types = new Map([
        ["black", 1],
        ["white", 1]]);
    export let card: any;
    // let deck = console.log($page.data.decks.content.filter((deck) => deck.id === $page.params.id));
    console.log(card);
</script>

<ListBoxItem bind:group={valueSingle} name="medium" value="books">
    <a class="block card card-hover p-4 {card.type.name}" href="/card/{card.id}">
        <header class="card-header">{card.content}</header>
        <section class="p-4"></section>
        <footer class="card-footer bottom-0">
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
