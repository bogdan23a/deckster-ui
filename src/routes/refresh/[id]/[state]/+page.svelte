<script lang='ts'>
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";

    let { data } = $props();
    let id = $state(data.params.id);
    let state = $state(data.params.state);
    onMount(async () => goto(`/game/${id}/${state}`));
</script>>