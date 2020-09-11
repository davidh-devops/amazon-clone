import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://amazon-challenge.herokuapp.com',
});

export default instance;
