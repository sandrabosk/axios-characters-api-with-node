const axios = require('axios')

class ApiService {
    static _instace
    constructor() {
        this.api = axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com/'
        })
    }
    static getInstance() {
        if (!this._instance) {
            this._instance = new ApiService();
        }
        return this._instance;
    }

    getAllCharacters = () => this.api.get('/characters')

    getCharacter = id => this.api.get(`/characters/${id}`)

    createCharacter = (data) => this.api.post(`/characters`, data)

    updateCharacter = (id, data) => this.api.put(`/characters/${id}`, data)

    deleteCharacter = id => this.api.delete(`/characters/${id}`)



}
module.exports = ApiService.getInstance()