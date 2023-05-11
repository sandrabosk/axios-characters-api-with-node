const axios = require("axios");

class MiMamaMePega {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com'
        })
    }
    todosLosPajuos() {
        return this.axiosApp.get('/characters')
    }
    idDelPajuo(pajuoId) {
        return this.axiosApp.get(`/characters/${pajuoId}`)
    }

    crearMamaguevo(info) {
        return this.axiosApp.post('/characters', info)
    }
    editarMamaguevo(pajuoId, info) {
        return this.axiosApp.put(`/characters/${pajuoId}`, info)
    }
    eliminarMamaguevo(pajuoId) {
        return this.axiosApp.delete(`/characters/${pajuoId}`)
    }

}

const miMamaMePega = new MiMamaMePega()

module.exports = miMamaMePega