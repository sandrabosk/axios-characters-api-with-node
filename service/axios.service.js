const axios = require('axios')

class Axios {
    constructor() {
        this.axios = axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com'
        });
    }

    listCharacters() {
        return this.axios.get('/characters').then((res) => res.data)
    }

    characterDetails(id) {
        return this.axios.get(`/characters/${id}`).then((res) => res.data)
    }

    createCharacter(...body) {
        console.log(...body)
        return this.axios.post('/characters', ...body).then((res) => res.data)
    }

    updateCharacter(id, ...body) {
        return this.axios.put(`/characters/${id}`, ...body).then((res) => res.data)
    }

    deleteCharacter(id) {
        return this.axios.delete(`/characters/${id}`).then((res) => res.data)
    }
}

module.exports = Axios