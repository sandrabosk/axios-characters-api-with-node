const axios = require('axios')

class ApiService {

    constructor() {
        this.api = axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com'
        })
    }

    getAllCharacters() {
        return this.api.get('/characters')
    }

    getOneCharacter(charId) {
        return this.api.get(`/characters/${charId}`)
    }

    createCharacter(charData) {
        return this.api.post('/characters', charData)
    }

    editCharacter(charId, charData) {
        return this.api.put(`/characters/${charId}`, charData)
    }

    deleteCharacter(charId) {
        return this.api.delete(`/characters/${charId}`)
    }
}

module.exports = ApiService