// services/api.service.js

// this is an example, no need to add it to your code yet

const axios = require('axios');

// Declaring this axios instance...
const api = axios.create({
  baseURL: 'https://ih-crud-api.herokuapp.com'
});

// ...allows you to only argument the rest of each URL on every call
// api
//   .get('/characters')
//   .then(response => console.log(`All characters are: `, response.data))
//   .catch(error => console.log(error));

// api
//   .get('/characters/264')
//   .then(response => console.log(`Character with ID 264 is:`, response.data))
//   .catch(error => console.log(error));

 
class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://ih-crud-api.herokuapp.com'
    });
  }
 
  getAllCharacters = () => {
    return this.api.get('/characters');
  };
 
  getOneCharacter = (characterId) => {
    return this.api.get(`/characters/${characterId}`);
  }
 
  createCharacter = (characterInfo) => {
    return this.api.post(`/characters`, characterInfo);
  }
 
  editCharacter = (characterId, characterInfo) => {
    return this.api.put(`/characters/${characterId}`, characterInfo);
  }
 
  deleteCharacter = (characterId) => {
    return this.api.delete(`/characters/${characterId}`);
  }
  
}
 
module.exports = ApiService;