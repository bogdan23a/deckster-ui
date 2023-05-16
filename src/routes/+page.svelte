<script>
// @ts-nocheck
	import { onMount } from 'svelte';
	import DeckList from '../lib/DeckList.svelte';
	import { inview } from 'svelte-inview/dist/index'
	let page = {
		"pageNumber": -1,
		"size": 10,
		"totalSize": -1
	};
	let inputDemo = '';
	let decks = [];
	const fetchDecks = async () => fetch(import.meta.env.VITE_DECKMASTER_URI + `/deck?pageSize=${page['size']}&pageNumber=${page['pageNumber'] + 1}`)
		.then(response => response.json())
		.then(data => {
			console.log(page['pageNumber'] + 1)
			if (data['content'] !== undefined) {
				decks = [...decks, ...data['content']];
			}
			page = data;
		})
		.catch(error => console.log(error));

	onMount(async () => fetchDecks());

	const handleChange = (event) => {
		if (event.detail.inView && decks.length !== page['totalSize'] + 1) {
			fetchDecks();
		}
	}
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
				{#await decks}
					loading...
				{:then decks}
					{#if decks !== null}
						<DeckList decks={decks}/>
					{/if}
				{:catch error}
					{error}
				{/await}
				<div use:inview={{}} on:change={handleChange} />
			</tr>
		</tbody>
	</table>
</div>