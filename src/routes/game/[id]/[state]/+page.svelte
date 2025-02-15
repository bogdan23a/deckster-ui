<script>
	import GameState from '$lib/game/GameState.svelte';
	import GameTask from '$lib/game/GameTask.svelte';

    let { data } = $props();
    // Object.keys(data.task.display).forEach((key) => console.log(data.task.display[key]))
    // Object.keys(data.task.display).forEach((item) => console.log(data.task.display[item]));
</script>

<GameState id={data.game.id} title={data.game.state} nextState={null}/>
<GameTask task={data.task}/>
