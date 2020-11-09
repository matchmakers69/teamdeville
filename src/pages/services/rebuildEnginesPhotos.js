import axios from 'axios';
import wordpressConfig from '../../utils/wordpress.config';

export const fetchEnginesPhotos = async () => {
  const URL = wordpressConfig.jsonUrl;
  const response = await axios.get(`${URL}engines`);
  return response.data;
};
