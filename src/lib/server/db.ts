const size = 100

export const getDecksPage = async () => fetch(import.meta.env.VITE_DECKMASTER_URI + `/deck`)
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

export const getDeckNames = () => fetch(import.meta.env.VITE_DECKMASTER_URI + `/deck/names`)
    .then(response => {
        if (response.ok) {
            return response.json()
        }
        throw new Error(`Failed to request deck names. Status ${response.status}`);
    }).catch(error => console.log(error));

export const saveDeck = (data:any) => fetch(import.meta.env.VITE_DECKMASTER_URI + '/deck', {
    method: 'POST',
    body: JSON.stringify({
        name: data['name']
    }),
    headers: {
        'Content-Type': 'application/json'
    }}).then(response => {
        if (response.ok) {
            return response.json()
        }
        throw new Error(`Failed to save deck ${data}. Status ${response.status}`)
    }).catch((error) => console.log(error));

export const saveCard = (data:any) => fetch(import.meta.env.VITE_DECKMASTER_URI + "/card", {
    method: 'POST',
    body: JSON.stringify({
        content: data['content'],
        deckId: data['deck_id'],
        typeId: data['type_id']
    }),
    headers: {
        "Content-Type": "application/json"
    }}).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(`Failed to save card ${data}. Status ${response.status}`)
        // goto("/deck/" + formData['name']);
    }).catch((error) => console.log(error));

export const getCardTypes = () => fetch(import.meta.env.VITE_DECKMASTER_URI + "/type")
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(`Failed to find card types. Status ${response.status}`);
    }).catch((error) => console.log(error));