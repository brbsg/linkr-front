import axios from 'axios';

// const BASE_URL = 'https://git.heroku.com/linkr-back-csgg.git';
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

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

function rePost(id, token) {
  const config = createConfig(token);
  const promise = axios.post(`${BASE_URL}/timeline/${id}`, {}, config);
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

function getUserPosts(token, params) {
  const config = createConfig(token);

  const response = axios.get(`${BASE_URL}/users/${params}`, config);

  return response;
}

function editPost(id, editedText) {
  const newText = { newText: editedText };
  const promise = axios.put(`${BASE_URL}/timeline/${id}`, newText);
  return promise;
}

function getUserLikes(token) {
  const config = createConfig(token);
  const promise = axios.get(`${BASE_URL}/likes`, config);
  return promise;
}

function searchUsers(token, body) {
  const config = createConfig(token);
  const response = axios.post(`${BASE_URL}/search-users`, body, config);

  return response;
}

function getUserName(token, params) {
  const config = createConfig(token);
  const promise = axios.get(`${BASE_URL}/users-name/${params.id}`, config);
  return promise;
}
function getPostsByHashtag(token, hashtag) {
  const config = createConfig(token);
  const promise = axios.get(`${BASE_URL}/hashtag/${hashtag}`, config);
  return promise;
}

function verifyFollower(id, token) {
  const config = createConfig(token);
  const promise = axios.get(`${BASE_URL}/following/${id}`, config);
  return promise;
}

function toggleFollow(id, token) {
  const config = createConfig(token);
  const promise = axios.get(`${BASE_URL}/follow/${id}`, config);
  return promise;
}

function postComment(body, token) {
  const config = createConfig(token);
  const promise = axios.post(`${BASE_URL}/comments`, body, config);
  return promise;
}

function getComments(id, token) {
  const config = createConfig(token);
  const promise = axios.get(`${BASE_URL}/post/${id}/comments`, config);
  return promise;
}

function getFollowing(token) {
  const config = createConfig(token);
  const promise = axios.get(`${BASE_URL}/following`, config);
  return promise;
}
function newPostsAlert(token) {
  const config = createConfig(token);
  const promise = axios.get(`${BASE_URL}/timeline/newPosts`, config);
  return promise;
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
  getUserLikes,
  deletePost,
  validateToken,
  getUserPosts,
  searchUsers,
  getUserName,
  editPost,
  getPostsByHashtag,
  verifyFollower,
  toggleFollow,
  postComment,
  getComments,
  getFollowing,
  newPostsAlert,
  rePost,
};

export default api;
