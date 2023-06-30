<script lang="ts">
	import { enhance } from '$app/forms';

	export let parent: any;
	export let form: any;

	import { modalStore } from '@skeletonlabs/skeleton';

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
		<form class="modal-form {cForm}" action="?/save" method="POST" use:enhance={() => {
			return async ({ update }) => {
				await update();
				modalStore.close();
			}
		}}>
			<label class="label">
				<span>Name</span>
				<input class="input" type="text" value={form?.name ?? ''} placeholder="Enter name..." name="name" required/>
			</label>
			<!-- prettier-ignore -->
			<footer class="modal-footer {parent.regionFooter}">
				<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
				<button class="btn {parent.buttonPositive}">Submit</button>
			</footer>
		</form>
	</div>
{/if}