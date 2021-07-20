const axios = require("axios");

const baseURL = "http://localhost:3004/api";

const apiConnect = axios.create({
  baseURL,
});

export default apiConnect;
