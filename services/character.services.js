const axios = require('axios')

class CharacterService {
    constructor() {
        this.api = axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com'
        })
    }

    getAllCharacters() {
        return this.api.get('/characters')
    }

    getOneCharacter(characterID) {
        return this.api.get(`/characters/${characterID}`)
    }

    saveCharacter(characterInfo) {
        return this.api.post('/characters', characterInfo)
    }

    editCharacter(characterID, characterInfo) {
        return this.api.put(`/characters/${characterID}`, characterInfo)
    }

    deleteCharacter(characterID) {
        return this.api.delete(`/characters/${characterID}`)
    }

}

module.exports = new CharacterService()
