const axios = require('axios')

class CharactersApi {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com'
        })
    }

    getAllCharacters() {
        console.log('hola')
        return this.axiosApp.get('/characters')
    }
    getOneCharacter(characterId) {
        return this.axiosApp.get(`/characters/${characterId}`)
    }

    saveCharacter(characterInfo) {
        return this.axiosApp.post(`/characters`, characterInfo)
    }

    editCharacter(characterId, characterInfo) {
        return this.axiosApp.put(`/characters/${characterId}`, characterInfo)
    }
}


const charactersApi = new CharactersApi()

module.exports = charactersApi