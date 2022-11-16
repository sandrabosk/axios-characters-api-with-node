const axios = require("axios")

class Service {

    constructor() {
        this.axiosService = axios.create({ baseURL: 'https://ih-crud-api.herokuapp.com/characters' })
    }

    getCharacters = () => this.axiosService.get("/")

    getCharacterByID = (characterID) => this.axiosService.get(`/${characterID}`)

    createCharacter = (characterData) => this.axiosService.post("/", characterData)

    updateCharacter = (characterID, characterNewData) => this.axiosService.put(`/${characterID}`, characterNewData)

    deleteCharacter = (characterID) => this.axiosService.delete(`/${characterID}`)

}

module.exports = Service