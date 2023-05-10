const axios = require('axios')

class CharactersApiHandler {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com'
        })
    }


    // LIST ALL CHARACTERS
    getAllCharacters() {
        return this.axiosApp.get('/characters')
    }

    // DETAILS
    getOneCharacter(characterId) {
        return this.axiosApp.get(`/characters/${characterId}`)
    }

    // SAVE UPDATE
    saveCharacter(characterInfo) {
        return this.axiosApp.post(`/characters`, characterInfo)
    }

    // UPDATE
    editCharacter(characterId, characterInfo) {
        return this.axiosApp.put(`/characters/${characterId}`, characterInfo)
    }

    // DELETE
    deleteCharacter(characterId) {
        return this.axiosApp.delete(`/characters/${characterId}`)
    }
}


const charactersApiHandler = new CharactersApiHandler()

module.exports = charactersApiHandler