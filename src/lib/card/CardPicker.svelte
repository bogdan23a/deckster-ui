<script lang='ts'>
	import CardOption from './CardOption.svelte';
    interface Props {
        cards: any;
        selectedResponses: any;
        requiredResponses: number;
        events: any[];
    }
    let { cards, requiredResponses, selectedResponses = $bindable(), events }: Props = $props();

    let stateCards: any[] = $state(cards);
    let selectedCards: any[] = $state(stateCards.slice(0, requiredResponses));
    let selectedIds: string[] = $state([]);

    $effect(() => {
        selectedIds = selectedCards.map((card: any) => card.id);
    });

    let onClick = (card: any) => {
        if (selectedCards.includes(card)) {
            const index = selectedCards.indexOf(card);
            selectedCards = [
                ...selectedCards.slice(0, index),
                ...selectedCards.slice(index + 1, selectedCards.length)
            ]
            selectedResponses = selectedCards.length;
            selectedIds = selectedCards.map((card: any) => card.id);
            return;
        }
        if (selectedCards.length >= requiredResponses) {
            selectedCards.pop();
        }
        selectedCards.push(card);
        selectedResponses = selectedCards.length;
        selectedIds = selectedCards.map((card: any) => card.id)
    };

    let getSelectionIndex = (card: any) => {
        return selectedCards.indexOf(card) + 1;
    }
</script>

{#if cards}
    <input type="hidden" hidden bind:value={selectedIds} name="cardIds[]">
    {#if events[0] === 'PICK_WINNER'}
    {#each stateCards as cardGroup}

        <CardGroupOption {cardGroup} selected={selectedCards.includes}
        {#each cardGroup as card}
            <CardOption {card} selected={selectedCards.includes(card)} {onClick} selectionIndex={getSelectionIndex(card)}/>
        {/each}
    {/each}
    {:else}
    {#each stateCards as card}
        {console.log(card)}
        <CardOption {card} selected={selectedCards.includes(card)} {onClick} selectionIndex={getSelectionIndex(card)}/>
    {/each}
    {/if}
{/if}