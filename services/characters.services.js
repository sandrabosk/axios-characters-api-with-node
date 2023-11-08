const axios = require("axios")

class CharacterServices {
    constructor() {
        this.axiosApp = axios.create({
            baseUrl: "https://ih-crud-api.herokuapp.com"
        })
    }

    getOneCharacter(characterId) {
        return this.axiosApp.get("/characters/${characterId}")
    }

    createCharacter(characterData) {
        return this.axiosApp.post(`/characters`, characterData)
    }

    editCharacter(characterId, characterData) {
        return this.axiosApp.put(`/characters/${characterId}`, characterData)
    }

    deleteCharacter(characterId) {
        return this.axiosApp.delete(`/characters/${characterId}`)
    }
}


const characterServices = new CharacterServices()

module.exports = CharacterServices