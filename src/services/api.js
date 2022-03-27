import axios from "axios";

// const BASE_URL = 'https://git.heroku.com/linkr-back-csgg.git';
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

function createConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

function loginUser(body) {
  const response = axios.post(`${BASE_URL}/sign-in`, body);

  return response;
}

async function createUser(user) {
  await axios.post(`${BASE_URL}/sign-up`, user);
}

function sendPost(body, token) {
  const config = createConfig(token);
  const promise = axios.post(`${BASE_URL}/timeline`, body, config);
  return promise;
}

function getPosts(token) {
  const config = createConfig(token);
  const promise = axios.get(`${BASE_URL}/timeline`, config);
  return promise;
}

function getHashtags(token) {
  const config = createConfig(token);
  const promise = axios.get(`${BASE_URL}/trendings`, config);
  return promise;
}

function getUser(token) {
  const config = createConfig(token);
  const promise = axios.get(`${BASE_URL}/user`, config);
  return promise;
}

function toggleLike(body, token) {
  const config = createConfig(token);
  const promise = axios.post(`${BASE_URL}/like`, body, config);
  return promise;
}

function getLikes(body, token) {
  const config = createConfig(token);
  const promise = axios.post(`${BASE_URL}/likes`, body, config);
  return promise;
}

function deletePost(id) {
  const promise = axios.delete(`${BASE_URL}/timeline/${id}`);
  return promise;
}

function validateToken(token) {
  const config = createConfig(token);
  const response = axios.get(`${BASE_URL}/validate-token`, config);

  return response;
}

const api = {
  loginUser,
  createUser,
  sendPost,
  getPosts,
  getHashtags,
  getUser,
  toggleLike,
  getLikes,
  deletePost,
  validateToken,
};

export default api;
