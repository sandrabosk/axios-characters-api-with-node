const axios = require('axios')

class CharacterHandler {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com'
        })
    }

    getCharacters() {
        return this.axiosApp.get('/characters')
    }
    getOneCharacter(character_id) {
        return this.axiosApp.get(`/characters/${character_id}`)
    }
    saveCharacter(characterInfo) {
        return this.axiosApp.post(`/characters`, characterInfo)
    }
    editCharacter(character_id, characterInfo) {
        return this.axiosApp.put(`/characters/${character_id}`, characterInfo)
    }
    deleteCharacter(character_id) {
        return this.axiosApp.delete(`/characters/${character_id}`)
    }
}
const characterHandler = new CharacterHandler()

module.exports = characterHandler