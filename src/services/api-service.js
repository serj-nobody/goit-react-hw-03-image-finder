const axios = require('axios').default;

const apiKey = '28115905-2ab66f444fd8f372634da0160';
axios.defaults.baseURL = 'https://pixabay.com/api/?';


const formattedFetch = (image) => ({
  id: image.id,
  webformatURL: image.webformatURL,
  largeImageURL: image.largeImageURL,
  tags: image.tags,
});

export async function fetchImages(query, page) {
  try {
    const response = await axios('', {
      params: {
        q: query,
        page: page,
        key: apiKey,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      }
    });

    return response.data.hits.map(formattedFetch);
  } catch (error) {
    console.log(error.message);
  }
};