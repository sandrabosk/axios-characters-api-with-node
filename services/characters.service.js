const axios = require('axios')

class CharactersService {
    constructor() {
        this.api = axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com'
        })
    }
    //----> List of all characters
    getAllCharacters () {
        return this.api.get('/characters')
    }
    //----> Details of a specific character
    getOneCharacter(characterId) {
        return this.api.get(`/characters/${characterId}`)
    }
    //----> Save a new character
    saveCharacter(characterInfo) {
        return this.api.post('/characters', characterInfo)
    }
    //----> Update a specific character
    editCharacter(characterId, characterInfo){
        return this.api.put(`/characters/${characterId}`, characterInfo)
    }
    //----> Delete a specific character
    deleteCharacter(characterId) {
        return this.api.delete(`/characters/${characterId}`)
    }

}


module.exports = new CharactersService()