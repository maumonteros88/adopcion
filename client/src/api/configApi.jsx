const axios = require("axios");

const URL = "http://192.168.100.220:3004/api";

const apiConnect = axios.create({
  URL,
});

export default apiConnect;
