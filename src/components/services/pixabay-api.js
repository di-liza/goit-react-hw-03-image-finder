// import axios from 'axios';

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
    return Promise.reject(
      new Error(`Сan't find a collection of images called "${query}"`)
    );
  });
}

const api = {
  fetchPixabay,
};

export default api;
// export default async function fetchImage(query, page) {
//   try {
//     return await axios.get(BASE_URL, {
//       params: {
//         key: API_KEY,
//         q: query,
//         image_type: 'photo',
//         page: page,
//         per_page: 12,
//       },
//     });
//   } catch (err) {
//     return err;
//   }
// }
