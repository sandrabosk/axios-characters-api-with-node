const axios = require('axios')

class ApiCharacterService {

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

    saveCharacter(characterInfo) {
        return this.axiosApp.post('/characters', characterInfo)
    }

    editCharacter(characterId, characterInfo) {
        return this.axiosApp.put(`/characters/${characterId}`, characterInfo)
    }

    deleteCharacter(characterId) {
        return this.axiosApp.delete(`/characters/${characterId}`)
    }
}

const apiCharacterHandler = new ApiCharacterService()

module.exports = apiCharacterHandler