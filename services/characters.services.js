const axios = require('axios')

class CharactersApiHandler {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com/characters'
        })
    }


    getAllCharacters() {

        return this.axiosApp.get('/')
    }

    getOneCharacter(character_id) {
        return this.axiosApp.get(`/${character_id}`)
    }

    saveCharacter(character_data) {
        return this.axiosApp.post(`/`, character_data)
    }

    editCharacter(character_id, character_data) {
        return this.axiosApp.put(`/${character_id}`, character_data)
    }

    deleteCharacter(character_id) {
        return this.axiosApp.delete(`/${character_id}`)
    }

}


const charactersApi = new CharactersApiHandler()

module.exports = charactersApi