const API_KEY = '34900910-a3a7207292faa050babd964c9';
const BASE_URL = 'https://pixabay.com/api/?';
const options = '&image_type=photo&orientation=horizontal&per_page=12';

function fetchPixabay(query, page) {
  return fetch(
    `${BASE_URL}q=${query}&page=${page}&key=${API_KEY}${options}`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(response.status));
  });
}

const api = {
  fetchPixabay,
};

export default api;
