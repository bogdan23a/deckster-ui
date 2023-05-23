<script lang="ts">
	export let parent: any;

    import { goto } from '$app/navigation';
	import { getDeckNames } from '$lib/server/db';
	import { modalStore } from '@skeletonlabs/skeleton';

	const formData = {
		name: '',
        decks: {
            data: await getDeckNames()
        }
	};

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
		<form class="modal-form {cForm}">
			<label class="label">
				<span>Name</span>
				<input class="input" type="text" bind:value={formData.name} placeholder="Enter name..." />
			</label>
			<label class="label">
				<span>Deck</span>
				<select class="input" type="text" bind:value={formData.name} placeholder="Enter name..." >
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