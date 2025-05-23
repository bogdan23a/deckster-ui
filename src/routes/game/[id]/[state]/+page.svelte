<script lang='ts'>
	import { goto } from '$app/navigation';
	import GameTask from '$lib/game/GameTask.svelte';
	import { Client } from '@stomp/stompjs';
	import { onMount } from 'svelte';

    let { data } = $props();

    const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time));

    const refreshPage = async () => {
        await sleep(100).then(() => {
            goto(`/refresh/${data.game.id}/${data.game.state}`);
        });
    };

    onMount(() => {
        const client = new Client({
            brokerURL: data.websocketUri,
            debug: function (message) {
                console.log(message);
            }
        });
        client.onConnect = (frame) => {
            console.log("Connected to ws", frame)
            client.subscribe('/public', refreshPage);
        }
        client.onStompError = (frame) => {
            console.log("error", frame)
        }
        client.activate();
    });

</script>

<form method="POST" action="/game">
    <GameTask task={data.task}/>
</form>