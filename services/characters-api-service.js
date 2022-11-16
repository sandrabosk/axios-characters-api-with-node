const axios = require('axios')

class ApiService {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com'
        })
    }
    // Character List 
    getAllCharacters = () => {
        return this.axiosApp.get('/characters')
    }
    // Get one Character - For details, creating, updating and deleting 
    getOneCharacter = (characterId) => {
        return this.axiosApp.get(`/characters/${characterId}`)
    }
    // Create Character
    createCharacter = (characterInfo) => {
        return this.axiosApp.post('/characters', characterInfo)
    }

    // Edit Character

    editCharacter = (characterId, characterInfo) => {

        return this.axiosApp.put(`/characters/${characterId}`, characterInfo)
    }

    // put to update 

    // Delete Character 
    deleteCharacter = (characterId) => {
        return this.axiosApp.delete(`/characters/${characterId}`)

    }

}

module.exports = ApiService