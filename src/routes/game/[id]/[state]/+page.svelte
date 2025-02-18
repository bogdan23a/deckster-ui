<script>
	import GameState from '$lib/game/GameState.svelte';
	import GameTask from '$lib/game/GameTask.svelte';

    let { data } = $props();
    
    /**
	 * @param {{ target: { value: string; }; }} event
	 */
    // Object.keys(data.task.display).forEach((key) => console.log(data.task.display[key]))
    // Object.keys(data.task.display).forEach((item) => console.log(data.task.display[item]));
</script>

<GameState id={data.game.id} title={data.game.state} nextState={null}/>
<form method="POST" action="/game">
    <GameTask task={data.task}/>
</form>