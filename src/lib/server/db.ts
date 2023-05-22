const prot_page = 0
const size = 10

export const getDecksPage = async (page:any) => fetch(import.meta.env.VITE_DECKMASTER_URI + `/deck?page=${page == null ? prot_page : page}&size=${size + 1}`)
    .then(response => response.json())
    .then(data => {
        if (data['content'] !== undefined) {
            return data;
        }
    })
    .catch(error => console.log(error));

export const getDeck = async (deckId:string) => fetch(import.meta.env.VITE_DECKMASTER_URI + `/deck/${deckId}`)
    .then(response => response.json())
    .then(data => data !== undefined ? data : "")
    .catch(error => console.log(error));
