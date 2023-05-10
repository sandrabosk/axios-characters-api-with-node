const axios = require("axios");

class CharactersApiHandler {

    constructor() {

        this.axiosApp = axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com'
        })
    }

    getAllCharacters() {
        return this.axiosApp.get('/characters')
    }

    getOneCharacter(characterId) {
        return this.axiosApp.get(`/characters/${characterId}`)
    }

    createCharacter(characterInfo) {
        return this.axiosApp.post('/characters', characterInfo)
    }

    editCharacter(characterID, characterInfo) {
        return this.axiosApp.put(`/characters/${characterID}`, characterInfo)
    }

    deleteCharacter(characterID, characterInfo) {
        return this.axiosApp.delete(`/characters/${characterID}`, characterInfo)
    }
}

const charactersApiHandler = new CharactersApiHandler()

module.exports = charactersApiHandler