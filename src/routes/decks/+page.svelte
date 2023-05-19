<script lang="ts">
    import { onMount } from 'svelte';
    import EditableDeckList from '$lib/EditableDeckList.svelte';
    import { inview } from 'svelte-inview/dist/index';
    import { modalStore } from '@skeletonlabs/skeleton';
    import { AddDeckModal } from '$lib/modals/AddDeckModal';


    let page = {
        "pageNumber": -1,
        "size": 10,
        "totalSize": -1
    };
    let inputDemo = '';
    let decks: any = [];
    const fetchDecks = async () => fetch(import.meta.env.VITE_DECKMASTER_URI + `/deck?pageSize=${page['size']}&pageNumber=${page['pageNumber'] + 1}`)
        .then(response => response.json())
        .then(data => {
            if (data['content'] !== undefined) {
                decks = [...decks, ...data['content']];
            }
            page = data;
        })
        .catch(error => console.log(error));

    onMount(async () => fetchDecks());

    const handleChange = (event: any) => {
        if (event.detail.inView && decks.length !== page['totalSize']) {
            fetchDecks();
        }
    }
    
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
                {#await decks}
                    loading...
                {:then decks}
                    {#if decks !== null}
                        <EditableDeckList decks={decks}/>
                    {/if}
                {:catch error}
                    {error}
                {/await}
                <div use:inview={{}} on:change={handleChange} />
            </tr>
        </tbody>
    </table>
</div>