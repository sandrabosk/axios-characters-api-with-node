const axios = require("axios");

class ApiService {
	constructor() {
		this.axiosApp = axios.create({
			baseURL: "https://ih-crud-api.herokuapp.com",
		});
	}

	listCharacters = () => {
		return this.axiosApp.get("/characters").then((res) => res.data);
	};

	createCharacter(character) {
		return this.axiosApp.post("/characters", character).then((character) => character.data);
	}

	getCharacterDetails = (characterId) => {
		return this.axiosApp.get(`/characters/${characterId}`).then((character) => character.data);
	};

	editCharacter = (characterId, character) => {
		return this.axiosApp.put(`/characters/${characterId}`, character).then((character) => character.data);
	};

	deleteCharacter = (characterId) => {
		return this.axiosApp.delete(`/characters/${characterId}`).then((character) => character.data);
	};
}

module.exports = ApiService;
