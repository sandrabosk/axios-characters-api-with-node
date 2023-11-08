const axios = require('axios')
class CharacterS {
    constructor() {
        this.axiosApp = axios.create(
            { baseURL: 'https://ih-crud-api.herokuapp.com' })
    }

    getAll() {
        return this.axiosApp.get('/characters')

    }
    getOne(char_id) {
        return this.axiosApp.get(`/characters/${char_id}`)
    }
    saveOne(char_data) {
        return this.axiosApp.post(`/characters`, char_data)
    }
    editOne(char_id, char_data) {
        return this.axiosApp.put(`/characters/${char_id}`, char_data)
    }
    deleteOne(char_id) {
        return this.axiosApp.delete(`/characters/${char_id}`)
    }
}
module.exports = characterS = new CharacterS()