import axios from 'axios';

const api = axios.create({
	baseUrl: 'https://rocket-drop.herokuapp.com',
});

export default api;
