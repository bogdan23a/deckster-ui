<script lang="ts">
    export let data:any;

    import { onMount } from 'svelte';
    import EditableDeckList from '$lib/deck/EditableDeckList.svelte';
    import { inview } from 'svelte-inview/dist/index';
    import { modalStore } from '@skeletonlabs/skeleton';
    import { AddDeckModal } from '$lib/deck/modal/AddDeckModal';

	let page = data.page.data;
    let inputDemo = '';
    
    // const handleChange = (event: any) => {
    //     if (event.detail.inView && decks.length !== page['totalSize']) {
    //         fetchDecks();
    //     }
    // }
    
    const triggerAddDeckModal = () => modalStore.trigger(AddDeckModal);
</script>

<div class="container h-full mx-auto flex">
    <table class=" flex-col w-full table-auto">
        <tbody>
            <tr>
                <td>
                    <input class="input my-10" type="search" name="demo" bind:value={inputDemo} placeholder="Search..." />
                </td>
                <td>
                    <button type="button" class="btn-icon btn-xl variant-filled" on:click={triggerAddDeckModal}>+</button>
                </td>
            </tr>
            <tr class="place-content-center">
                {#await page}
                    loading...
                {:then page}
                    {#if !page['empty']}
                        <EditableDeckList decks={page.content}/>
                    {/if}
                {:catch error}
                    {error}
                {/await}
                <!-- <div use:inview={{}} on:change={handleChange} /> -->
            </tr>
        </tbody>
    </table>
</div>