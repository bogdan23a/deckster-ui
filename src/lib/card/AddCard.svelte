<script lang="ts">
	export let parent: any;
	export let deck:any;

    import { goto } from '$app/navigation';
	import { modalStore } from '@skeletonlabs/skeleton';

	const formData = {
		name: '',
        deck: {
			id: "123",
			type: {
				'id': "321"
			}
		}
	};

	const types = [{
			id: "321",
			name: "Black"
		},{
			id: "331",
			name: "White"
		}]

	function onFormSubmit(): void {
		if ($modalStore[0].response) {
            $modalStore[0].response(formData);
            fetch(import.meta.env.VITE_DECKMASTER_URI + "/card", {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(() => {
                goto("/deck/" + formData['name']);
            })
            .catch((error) => console.log(error));
        }
		modalStore.close();
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<article>{$modalStore[0].body ?? '(body missing)'}</article>
		<!-- Enable for debugging: -->
		<form class="modal-form {cForm}" action="/deck/save" method="POST">
			<label class="label">
				<span>Name</span>
				<input class="input" type="text" bind:value={formData.name} placeholder="Enter name..." />
			</label>
			<label class="label">
				<span>Deck</span>
				<input class="input" type="text" bind:value={formData.deck.id} placeholder="Select deck..." disabled>
			</label>
			<label class="label">
				<span>Type</span>
				<label for="underline_select" class="sr-only">Select card type...</label>
				<select id="underline_select" bind:value={formData.deck.type.id} class="block py-2.5 px-2.5 text-md text-gray-500 input border-0 border-b-2 border-gray-200 dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200">
					{#each types as type}
						<option value="{type.id}">{type.name}</option>
					{/each}
				</select>
			</label>
		</form>
		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Submit Form</button>
    </footer>
	</div>
{/if}