const axios = require('axios')

class ApiService {

    constructor() {
        this.api = axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com'
        })
    }

    // List
    getAllCharacters() {
        return this.api.get('/characters')
    }

    // Details
    getOneCharacter(characterId) {
        return this.api.get(`/characters/${characterId}`)
    }

    // Create
    saveCharacter(characterData) {
        return this.api.post(`/characters`, characterData)
    }

    // Edit
    editCharacter(characterId, characterData) {
        return this.api.put(`/characters/${characterId}`, characterData)
    }

    // Delete
    deleteCharacter(characterId, characterData) {
        return this.api.delete(`/characters/${characterId}`, characterData)
    }
}

module.exports = ApiService