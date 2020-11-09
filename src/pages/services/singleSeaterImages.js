import axios from 'axios';
import wordpressConfig from '../../utils/wordpress.config';

export const fetchSingleSeaterImages = async () => {
  const URL = wordpressConfig.jsonUrl;
  const response = await axios.get(`${URL}single-seaters`);
  return response.data;
};
