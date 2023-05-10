const axios = require('axios')

class CharactersApiHandler {

    constructor (){
        this.axiosApp = axios.create({
            baseURL: "https://ih-crud-api.herokuapp.com"
        })
    }

    getAllCharacters(){
        return this.axiosApp.get("/characters")
    }

      getCharactersById(id){
        return this.axiosApp.get(`/characters/${id}`)
    }

    createCharacter(dataCharacter){
        return this.axiosApp.post("/characters", dataCharacter)
    }

    updateCharacter(characterId, dataCharacter){
        return this.axiosApp.put(`/characters/${characterId}`, dataCharacter )
    }


    deleteCharacter(characterId){
        return this.axiosApp.delete(`/characters/${characterId}`)
    }


}


const charactersApiHandler = new CharactersApiHandler()

module.exports = charactersApiHandler