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

    getOneCharacter(character_id) {
        return this.axiosApp.get(`/characters/${character_id}`)
    }

    newCharacter(character_data) {
        return this.axiosApp.post(`/characters`, character_data)
    }

    updateCharacter(character_id, character_data) {
        return this.axiosApp.post(`characters/${character_id}`, character_data, character_id)
    }

    deleteCharacter(character_id) {
        return this.axiosApp.delete(`/characters/${character_id}`);
    }

}

const charactersApi = new CharactersApiHandler()

module.exports = charactersApi


