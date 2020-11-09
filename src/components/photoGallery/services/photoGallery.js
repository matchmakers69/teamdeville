import axios from 'axios';
import wordpressConfig from '../../../utils/wordpress.config';

export const fetchGalleryPhotos = async () => {
  const URL = wordpressConfig.jsonUrl;
  const response = await axios.get(`${URL}photos`);
  return response.data;
};
