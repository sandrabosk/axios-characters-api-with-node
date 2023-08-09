const axios = require('axios')


class characterApiMi {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com'
        })
    }

    getAllCharacters() {
        return this.axiosApp.get("/characters")
    }


    getOneCharacter(character_id) {

        return this.axiosApp.get(`/characters/${character_id}`)

    }

    saveCharacter(character_data) {
        return this.axiosApp.post(`/characters`, character_data)
    }

    editCharacter(character_id, character_data) {
        return this.axiosApp.put(`/characters/${character_id}`, character_data)
    }


    deletedOneCharacter(character_id) {

        return this.axiosApp.delete(`/characters/${character_id}`)

    }

}

const charactersApi = new characterApiMi()

module.exports = charactersApi
