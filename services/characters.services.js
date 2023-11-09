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

    getOneCharacter(characters_id) {
        return this.axiosApp.get(`/characters/${characters_id}`)
    }

    newCharacter(character_data) {
        return this.axiosApp.post(`/characters`, character_data)
    }

    editCharacters(characters_id, character_data) {
        return this.axiosApp.put(`/characters/${characters_id}`, character_data)
    }

    deleteCharacter(characters_id) {
        return this.axiosApp.delete(`/characters/${characters_id}`)
    }

}



const charactersService = new CharacterService()

module.exports = charactersService