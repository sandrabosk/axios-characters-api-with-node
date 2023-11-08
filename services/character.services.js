const axios = require("axios")
class Character {

    constructor() {
        this.axiosBaseRoute = axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com'
        })
    }

    getAllCharacters() {
        return this.axiosBaseRoute.get('/characters')
    }

    getCharacterByID(charId) {
        return this.axiosBaseRoute.get(`/characters/${charId}`)
    }

    createCharacter(newCharacter) {
        return this.axiosBaseRoute.post('/characters', newCharacter)
    }

    getCharacterByIDAndUpdate(charId, newData) {
        return this.axiosBaseRoute.put(`/characters/${charId}`, newData)
    }
    getCharacterByIDAndDelete(charId) {
        return this.axiosBaseRoute.delete(`/characters/${charId}`)
    }


}

const charService = new Character()

module.exports = charService