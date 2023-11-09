const axios = require('axios')

class CharacterService {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com'
        })
    }

    getAllCharacters() {
        return this.axiosApp.get('/characters')
    }

    getOneCharacter(characterId) {
        return this.axiosApp.get(`/characters/${characterId}`)
    }

    saveCharacter(character_data) {
        return this.axiosApp.post('/characters', character_data)
    }

    editCharacter(characterId, character_data) {
        return this.axiosApp.put(`/characters/${characterId}`, character_data)
    }

    deleteCharacter(characterId) {
        return this.axiosApp.delete(`/characters/${characterId}`)
    }


}

const characterService = new CharacterService()
module.exports = characterService