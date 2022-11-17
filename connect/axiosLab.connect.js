const axios = require('axios');

class AxiosLabAPI {
    constructor() {
        this.axios = axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com',
        });
    }

    getCharacters() {
        return this.axios.get('/characters')
    }

    getCharacter(id) {
        return this.axios.get(`/characters/${id}`)
    }

    createCharacter(body) {
        return this.axios.post('/characters', body)
    }

    editCharacter(id, body) {
        return this.axios.put(`/characters/${id}`, body)
    }

    deleteCharacter(id) {
        return this.axios.delete(`/characters/${id}`)
    }
}

module.exports = AxiosLabAPI;
