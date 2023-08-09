const axios = require('axios')

class CharactersApiHandler {

    constructor() {

        this.axiosApp = axios.create({
            baseURL: "https://ih-crud-api.herokuapp.com"

        })

    }

    getAllCharacters() {

        return this.axiosApp.get('/characters')
    }

    getOneCharacter(character_id) {

        return this.axiosApp.get(`/characters/${character_id}`)
    }

    saveOneCharacter(character_data) {

        return this.axiosApp.post(`/characters`, character_data)
    }

    editOneCharacter(character_id, character_data) {
        console.log(character_data, "HOLAAAA")
        return this.axiosApp.put(`/characters/${character_id}`, character_data)
    }

    deleteOneCharacter(character_id) {

        return this.axiosApp.delete(`/characters/${character_id}`)
    }


}


const charactersApi = new CharactersApiHandler()
module.exports = charactersApi