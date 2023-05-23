import type { ModalComponent, ModalSettings } from "@skeletonlabs/skeleton";
import AddDeck from "$lib/deck/AddDeck.svelte";

const c: ModalComponent = {ref: AddDeck};
export const AddDeckModal: ModalSettings = {
    type: 'component',
    component: c,
    title: 'Add New Deck',
    body: 'Complete the form below and then press submit',
    response: (r: any) => console.log('response:', r)
};
