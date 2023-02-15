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

    getOneCharacter(character_id) {
        return this.api.get(`/characters/${character_id}`)
    }

    createCharacter(characterData) {
        return this.api.post(`/characters`, characterData)
    }

    editCharacter(character_id, characterData) {
        return this.api.put(`/characters/${character_id}`, characterData)
    }

    deleteCharacter(character_id) {
        return this.api.delete(`/characters/${character_id}`)
    }
}

module.exports = ApiService