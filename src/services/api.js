import axios from 'axios';

// const BASE_URL = 'https://git.heroku.com/linkr-back-csgg.git';
const BASE_URL = 'https://localhost:5000';

async function createUser(user) {
  await axios.post(`${BASE_URL}/sign-up`, user);
}

const api = {
  createUser,
};

export default api;
