const axios = require ('axios')

class CharactersService {

    constructor() {

        this.api= axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com'
        })
    }

//list all characters

    getAllCharacters() {
        return this.api.get('/characters')
    }

//get one character

    getOneCharacter(characterId) {
        return this.api.get(`/characters/${characterId}`)
    }

// create character

    saveCharacter(characterInfo) {
        return this.api.post(`/characters/create`, characterInfo)
    }
    
    

    // editCharacter(characterId, characterInfo) {
    //     return this.api.put(`/characters/${characterId}`, characterInfo)
    // }

    // deleteCharacter(characterId) {
    //     return this.api.delete(`/characters/${characterId}`)
    // }
}

module.exports = new CharactersService()
