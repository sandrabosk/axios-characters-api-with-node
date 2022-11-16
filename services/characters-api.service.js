const  axios = require("axios")


class ApiService {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com'
        })
    }

    getAllCharacters = () => {
        return this.axiosApp.get('/characters')
    }

    getCharacterById = (character_id) => {
        return this.axiosApp.get(`/characters/${character_id}`)
    }

    createNewCharacter = (characterInfo) => {
        return this.axiosApp.post(`/characters`, characterInfo)
    }

    updateCharacter = (character_id, characterInfo) => {
        return this.axiosApp.put(`/characters/${character_id}`, characterInfo)
    }

    deleteCharacterById = (character_id) => {
        return this.axiosApp.delete(`/characters/${character_id}`)
    }
}

module.exports = ApiService