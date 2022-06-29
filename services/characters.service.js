const axios = require('axios')

class CharactersService {

    constructor() {
        this.api = axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com/'
        })
    }

    getAllCharacters() {
        return this.api.get('/characters')
    }

    getOneCharacters(characterId) {
        return this.api.get(`/characters/${characterId}`)
    }

    saveCharacters(characterInfo) {
        return this.api.post('/characters', characterInfo)
    }

    editCharacters(characterId, characterInfo) {
        return this.api.put(`/characters/${characterId}`, characterInfo)
    }

    deleteCharacters(characterId) {
        return this.api.delete(`characters/${characterId}`)
    }
}

module.exports = new CharactersService()