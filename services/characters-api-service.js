const axios = require('axios')

class CharactersApiHandler {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com'
        })
    }

    getCharacters() {
        return this.axiosApp.get('/characters')
    }

    getOneCharacter(id) {
        return this.axiosApp.get(`/characters/${id}`)
    }

    createCharacter(character) {
        return this.axiosApp.post('/characters', character) 
    }

    editCharacter(id, character) {
        return this.axiosApp.put(`/characters/${id}`, character) 
    }

    deleteCharacter(id) {
        return this.axiosApp.delete(`/characters/${id}`) 
    }

}


charactersApiHandler = new CharactersApiHandler()

module.exports = charactersApiHandler