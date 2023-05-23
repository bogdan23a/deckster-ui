<script lang='ts'>
    /** @type {import('./$types').PageData} */
    export let data;

	import DeckList from '../lib/deck/DeckList.svelte';
	import { inview } from 'svelte-inview/dist/index'

	let inputDemo = '';
	let page = data.page.data;

	// const handleChange = (event) => {
		// if (event.detail.inView && page['pageNumber'] + 1 !== page['totalPage']) {
			// getDecksPage(page['pageNumber'] + 1);
		// }
	// }
</script>

<div class="container h-full mx-auto flex">
	<table class=" flex-col w-full table-auto">
		<tbody>
			<tr>
				<td>
					<input class="input my-10" type="search" name="demo" bind:value={inputDemo} placeholder="Search..." />
				</td>
			</tr>
			<tr class="place-content-center">
				{#await page}
					loading...
				{:then page}
					{#if !page['empty']}
						<DeckList decks={page['content']}/>
					{/if}
				{:catch error}
					{error}
				{/await}
				<!-- <div use:inview={{}} on:change={handleChange} /> -->
			</tr>
		</tbody>
	</table>
</div>