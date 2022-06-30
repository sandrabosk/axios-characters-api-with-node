const axios = require('axios')

class CharactersService {

    constructor() {
        this.api = axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com'
        })
    }

    getAllChars() {
        return this.api.get('/characters')
    }

    getOneChar(charId) {
        return this.api.get(`/characters/${charId}`)
    }

    createChar(charInfo) {
        return this.api.post('/characters', charInfo)
    }

    editChar(charId, charInfo) {
        return this.api.put(`/characters/${charId}`, charInfo)
    }

    deleteChar(charId) {
        return this.api.delete(`/characters/${charId}`)
    }

}

module.exports = new CharactersService()