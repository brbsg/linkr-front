import axios from "axios";

// const BASE_URL = 'https://git.heroku.com/linkr-back-csgg.git';
const BASE_URL = 'http://localhost:5000';

function createConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

async function createUser(user) {
  await axios.post(`${BASE_URL}/sign-up`, user);
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

function getHashtags(token){
  const config = createConfig(token);
  const promise = axios.post(`${BASE_URL}/trendings`, {}, config);
  return promise;
}

const api = {
  createUser,
  sendPost,
  getPosts,
  getHashtags
};

export default api;