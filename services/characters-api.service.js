const axios = require('axios')

class ApiService {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com'
        })
    }
    //List
    getAllCharacters = () => {
        return this.axiosApp.get('/characters')

    }
    //Details
    getOneCharacter = (characterId) => {
        return this.axiosApp.get(`/characters/${characterId}`)

    }
    //Create
    createCharacter = (characterInfo) => {

        return this.axiosApp.post(`/characters`, characterInfo)

    }
    //Edit
    editCharacter = (characterId, characterInfo) => {
        return this.axiosApp.put(`/characters/${characterId}`, characterInfo)

    }
    //Delete
    deleteCharacter = (characterId) => {
        return this.axiosApp.delete(`/characters/${characterId}`)

    }
}

module.exports = ApiService