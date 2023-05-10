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

    saveCharacter(characterInfo) {
        return this.axiosApp.post('/characters', characterInfo)
    }

    editCharacter(id, characterInfo) {
        return this.axiosApp.put(`/characters/${id}`, characterInfo)
    }

    deleteCharacter(id) {
        return this.axiosApp.delete(`/characters/${id}`)
    }

}

const charactersApiHandler = new CharactersApiHandler()

module.exports = charactersApiHandler