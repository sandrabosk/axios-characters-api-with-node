const axios = require('axios')

class CharactersApiHandler {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com'

        })
    }

    getAllCharacters() {
        return this.axiosApp.get('/characters')
    }

    getCharacterDetail(character_id) {
        return this.axiosApp.get(`/characters/${character_id}`)
    }

    saveCharacter(character_data) {
        return this.axiosApp.post('/characters', character_data)
    }

    editCharacter(character_id, character_data) {
        return this.axiosApp.put(`/characters/${character_id}`, character_data)
    }

    deleteCharacter(character_id) {
        return this.axiosApp.delete(`/characters/${character_id}`)
    }

}

const charactersApi = new CharactersApiHandler()

module.exports = charactersApi