import axios from "axios";

// const BASE_URL = 'https://git.heroku.com/linkr-back-csgg.git';
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000"

function loginUser(body) {
  const response = axios.post(`${BASE_URL}/sign-in`, body);

  return response;
}

function createConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

async function createUser(user) {
  await axios.post(`${BASE_URL}/sign-up`, user);
}

function sendPost(body, token) {
  const config = createConfig(token);
  const promise = axios.post(`${BASE_URL}/timeline/publish`, body, config);
  return promise;
}

function getPosts(token) {
  const config = createConfig(token);
  const promise = axios.post(`${BASE_URL}/timeline/posts`, {}, config);
  return promise;
}

function getUser(token) {
  const config = createConfig(token);
  const promise = axios.get(`${BASE_URL}/user`, config)
  return promise;
}

const api = {
  loginUser,
  createUser,
  sendPost,
  getPosts,
  getUser
};

export default api;
