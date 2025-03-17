<script lang='ts'>
	import GameTask from '$lib/game/GameTask.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { Client } from '@stomp/stompjs';

    let { data } = $props();

    const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time));

    const refresh = async () => {
        await sleep(100).then(() => {
            goto(`/refresh/${data.game.id}/${data.game.state}`);
        });
    };
    onMount(() => {
        const client = new Client({
            brokerURL: 'ws://localhost:9090/websocket',
            debug: function (message) {
                console.log(message);
            }
        });

        client.onConnect = (frame) => {
            console.log("Connected", frame);
            client.subscribe('/public', refresh)
        }

        client.onStompError = (frame) => {
            console.log("error", frame)
        }

        client.activate();
        // const interval = setInterval(() => {
        //     console.log("refreshing")
        //     invalidateAll();
        // }, 1000);
        // return () => {
        //     clearInterval(interval);
        // };
    });
</script>

<!-- <GameState id={data.game.id} title={data.game.state} nextState={null}/> -->
<form method="POST" action="/game">
    <GameTask task={data.task}/>
</form>

<!-- <button onclick={() => }>send</button> -->