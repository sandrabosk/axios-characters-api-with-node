const axios = require('axios')

class ApiService {

    constructor() {
        this.api = axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com'
        })
    }

    getAllCharacters() {
        return this.api.get('/characters')
    }

    getOneCharacter(characterId) {
        return this.api.get(`/characters/${characterId}`)
    }

    saveCharacter(characterData) {
        return this.api.post(`/characters`, characterData)
    }

    editCharacter(characterId, characterData) {
        return this.api.put(`/characters/${characterId}`, characterData)
    }

    deleteCharacter(characterId, characterData) {
        return this.api.delete(`/characters/${characterId}`, characterData)
    }
}

module.exports = ApiService