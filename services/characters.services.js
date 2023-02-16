const axios = require('axios')

class CharacterApi {

    constructor() {
        this.api = axios.create({
            baseUrl: 'https://ih-crud-api.herokuapp.com'
        })
    }

    getAll() {
        return this.api.get('/characters')
    }

    saveCharacter(characterData) {
        return this.api.post(`/characters`, characterData)
    }

    // editCharacter(characterId, characterData) {
    //     return this.api.put(`/characters/${characterId}`, characterData)
    // }

}
module.exports = CharacterApi 