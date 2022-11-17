const axios = require('axios');

class ApiService {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com'
        })
    }

    getAllCharacters = () => {
        return this.axiosApp.get('/characters').then((res) => res.data);
    }

    getOneCharacter = (characterId) => {
        return this.axiosApp.get(`/characters/${characterId}`).then((res) => res.data);
    }

    createCharacter = (characterInfo) => {
        return this.axiosApp.post(`/characters`, characterInfo);
    }

    editCharacter = (characterId, characterInfo) => {
        return this.axiosApp.put(`/characters/${characterId}`, characterInfo);
    }

    deleteCharacter = (characterId) => {
        return this.axiosApp.delete(`/characters/${characterId}`);
    }
}

module.exports = ApiService