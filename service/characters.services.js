const axios = require("axios");

class CharacterServices {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com'
        })
    }

    getAllCharacters() {
        return this.axiosApp.get('/characters')
    }

    getCharacter(character_id) {
        return this.axiosApp.get(`/characters/${character_id}`)
    }

    postCharacter(character_data) {
        return this.axiosApp.post("/characters", character_data)
    }

    updateCharacter(character_id, character_data) {
        return this.axiosApp.put(`/characters/${character_id}`, character_data)
    }

    deleteCharacter(character_id) {
        return this.axiosApp.delete(`/characters/${character_id}`)
    }

}

const characterServices = new CharacterServices()

module.exports = characterServices