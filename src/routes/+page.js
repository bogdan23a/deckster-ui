// const fetchDecks = async () => fetch(import.meta.env.VITE_DECKMASTER_URI + `/deck?pageSize=${page['size']}&pageNumber=${page['pageNumber'] + 1}`)
// .then(response => response.json())
// .then(data => {
//     console.log(page['pageNumber'] + 1)
//     if (data['content'] !== undefined) {
//         decks = [...decks, ...data['content']];
//     }
//     page = data;
// })
// .catch(error => console.log(error));