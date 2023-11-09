const axios = require('axios')

class charactersService {

constructor() {
    this.axiosApp = axios.create({
        baseURL: 'https://ih-crud-api.herokuapp.com'
    })
}

getAllCharacters() {
    return this.axiosApp.get('/characters')
}


detailCharacter(id) {
    return this.axiosApp.get(`/characters/${id}`)
}

createCharacter(newCharacter) {
    return this.axiosApp.get('/character', newCharacter )
}

editCharacter(id) {
    return this.axiosApp.get(`/characters/${id}`)
}

deleteCharacter(id) {
    return this.axiosApp.delete(`/characters/${id}`)
}



}


const charactersServiceInstance = new charactersService()

module.exports = charactersServiceInstance