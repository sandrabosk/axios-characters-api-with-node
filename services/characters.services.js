const axios = require('axios')

class CharactersService {

    constructor() {

        this.axiosApp = axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com'
        })
    }

    getAllCharacters() {
        return this.axiosApp.get('/characters')
    }

    getOneCharacter(character_id) {
        return this.axiosApp.get(`/characters/${character_id}`)
    }

    postCharacter(character_data) {
        return this.axiosApp.post(`/characters`, character_data)
    }

    putCharacter(character_id, character_data) {
        return this.axiosApp.put(`/characters/${character_id}`, character_data)
    }

    deleteCharacter(character_id) {
        return this.axiosApp.delete(`/characters/${character_id}`)
    }

}


const charactersService = new CharactersService()

module.exports = charactersService