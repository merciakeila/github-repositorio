import axios from 'axios';

//Necessário instalar um axios (yarn add axios)
const api = axios.create({
  baseURL: 'https://api.github.com',
});

export default api;
