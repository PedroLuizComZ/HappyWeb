import axios from "axios";

const api = axios.create({
	baseURL: "https://happy-node-backend.herokuapp.com",
});

export default api;
