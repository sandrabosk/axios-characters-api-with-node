const axios = require("axios");

class AxiosIH {
    constructor() {
        this.axios = axios.create({
            baseURL: "https://ih-crud-api.herokuapp.com/characters"
        })
    }

    getCharacters() {
        return this.axios.get("/")
            .then(response => response.data)
    }

    getCharacter(id) {
        return this.axios.get(`/${id}`)
            .then(response => response.data)
    }

    createCharacter(character) {
        return this.axios.post("/", character)
            .then(response => response.data)
    }

    updateCharacter(id, character) {
        return this.axios.put(`/${id}`, character)
            .then(response => response.data)
    }

    deleteCharacter(id) {
        return this.axios.delete(`/${id}`)
            .then(response => response.data)
    }
}

module.exports = AxiosIH;