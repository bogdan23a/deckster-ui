<script lang='ts'>
    interface Props {
        players: any;
    }

    let { players }: Props = $props();
</script>

<div class="pt-6">
    <div class="card card-hover Response">
        <header class="card-header p-2">Score</header>
        <section class="p-4">
            {#each players as player}
                <p>{player.first}: {player.second}</p>
            {/each}
        </section>
        <footer class="card-footer bottom-0"></footer>
    </div>
</div>

<style lang="postcss">
    .card-header {
        font-size: 20px;
    }

    .Response {
        border-color: rgb(0, 0, 0);
        background-color: rgb(255, 255, 255) !important;
        color: rgb(0, 0, 0);
    }
</style>
