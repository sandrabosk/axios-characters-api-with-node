const axios = require('axios')

class Axios {
    constructor() {
        this.axios = axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com'
        });
    }
    getCharacters() {
        return this.axios.get('/characters').then((res) => res.data);
    }

    getCharacter(id) {
        return this.axios.get(`/characters/${id}`).then((res) => res.data);
    }

    createCharacter({ name, weapon, occupation, debt }) {

        return this.axios
            .post('/characters', { name, weapon, occupation, debt })
            .then((res) => res.data);
    }

    editCharacter(id, body) {
        return this.axios.put(`/characters/${id}`, body).then((res) => res.data);
    }

    deleteCharacter(id) {
        return this.axios.delete(`/characters/${id}`).then((res) => res.data);
    }
}

module.exports = Axios;