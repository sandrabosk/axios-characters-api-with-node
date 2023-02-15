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

    getOneCharacter(id) {
        return this.api.get(`/characters/${id}`)
    }

    createCharacter(data) {
        return this.api.post("/characters", data)
    }

    editCharacter(id, data) {
        return this.api.put(`/characters/${id}`, data)
    }

    deleteCharacter(id) {
        return this.api.delete(`/characters/${id}`)
    }
}

module.exports = ApiService