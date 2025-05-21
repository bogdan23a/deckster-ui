<script lang='ts'>
    interface Props {
        card: any;
    }

    let { card }: Props = $props();
</script>

<div class="pt-6">
    <div class="block card card-hover {card.type.name}">
        <header class="card-header"></header>
        <section class="p-4">{card.content}</section>
        <footer class="card-footer bottom-0"></footer>
    </div>
</div>

<style lang="postcss">
	.Prompt {
        border-color: rgb(255, 255, 255);
        background-color: rgb(0, 0, 0) !important;
        color: rgb(255, 255, 255);
	}

    .Response {
        border-color: rgb(0, 0, 0);
        background-color: rgb(255, 255, 255) !important;
        color: rgb(0, 0, 0);
    }
</style>
