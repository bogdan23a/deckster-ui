<script lang='ts'>
	import GameTask from '$lib/game/GameTask.svelte';
	import { onMount } from 'svelte';

    let { data } = $props();

    onMount(() => data.connectToWS());
</script>

<form method="POST" action="/game">
    <GameTask task={data.task}/>
</form>