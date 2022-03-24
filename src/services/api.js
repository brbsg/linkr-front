import axios from "axios";

// const BASE_URL = 'https://git.heroku.com/linkr-back-csgg.git';
const BASE_URL = "http://localhost:5000";

function createConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

function sendPost(body, token){
  const config = createConfig(token);
  const promise = axios.post(`${BASE_URL}/timeline/publish`, body, config);
  return promise;
}

const api = {
  sendPost
};

export default api;