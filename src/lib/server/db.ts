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

export const createNewGame = (email: string) => fetch(import.meta.env.VITE_DECKMASTER_URI + "/game", {
    method: 'PUT',
    headers: {
        "Content-Type": "application/json",
        "email": email
    }})
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(`Failed to create new game. Status ${response.status}`);
    }).catch((error) => console.log(error));

export const getGame = (email: string, gameId: string) => fetch(import.meta.env.VITE_DECKMASTER_URI + `/game`, {
    headers: {
        "email": email,
        "game_id": gameId
    }})
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(`Failed to find game ${gameId}. Status ${response.status}`);
    }).catch((error) => console.log(error));

export const getTask = (gameId: string, state: string, email: string) => fetch(import.meta.env.VITE_DECKMASTER_URI + `/task/${state}`, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        game_id: gameId,
        email: email
    })})
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(`Failed to find task ${state}. Status ${response.status}`);
    }).catch((error) => console.log(error));

export const sendEvent = (message: { game_id: string, email: string, deck_id: string, card_ids: string }, event: string) => fetch(import.meta.env.VITE_DECKMASTER_URI + `/game/${event}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            game_id: message.game_id,
            email: message.email,
            deck_id: message.deck_id,
            card_ids: message.card_ids
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(`Failed to send event ${event}. Status ${response.status}`);
    }).catch((error) => console.log(error));