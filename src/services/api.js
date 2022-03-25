import axios from "axios";

// const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const BASE_URL = "http://localhost:5000";

function createConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

function sendPost(body, token){
  const config = createConfig(token);
  const promise = axios.post(`${BASE_URL}/timeline/publish`, body, config);
  return promise;
}

function getPosts(token){
  const config = createConfig(token);
  const promise = axios.post(`${BASE_URL}/timeline/posts`, {}, config);
  return promise;
}

const api = {
  sendPost,
  getPosts
};

export default api;