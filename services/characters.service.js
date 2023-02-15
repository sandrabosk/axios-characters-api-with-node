const axios = require('axios')

class charactersApi {
    constructor() {
        this.api = axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com/characters'
        })
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new charactersApi()
        }
        return this.instance
    }

    getAllCharacters() {
        return this.api.get('/')
    }

    getOneCharacter(id) {
        return this.api.get(`/${id}`)
    }

    addNewCharacter(info) {
        return this.api.post('/', info)
    }

    editCharacter(id, info) {
        return this.api.put(`/${id}`, info)
    }

    deleteCharacter(id) {
        return this.api.delete(`/${id}`)
    }


}

module.exports = charactersApi.getInstance()