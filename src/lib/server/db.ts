const size = 10

export const getDecksPage = async (page:any) => fetch(import.meta.env.VITE_DECKMASTER_URI + `/deck?page=${page}&size=${size}`)
    .then(response => {
        if (response.ok) {
            return response.json()
        }
        throw new Error(`Failed to request decks. Status ${response.status}`);
    })
    .catch(error => console.error(error));

export const getDeck = async (deckId:string) => fetch(import.meta.env.VITE_DECKMASTER_URI + `/deck/${deckId}`)
    .then(response => {
        if (response.ok) {
            return response.json()
        }
        throw new Error(`Failed to request deck ${deckId}. Status ${response.status}`);
    })
    .catch(error => console.log(error));

export const getDeckNames = async () => fetch(import.meta.env.VITE_DECKMASTER_URI + `/deck/names`)
    .then(response => {
        if (response.ok) {
            return response.json()
        }
        throw new Error(`Failed to request deck names. Status ${response.status}`);
    })
    .catch(error => console.log(error));
