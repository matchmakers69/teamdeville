import axios from 'axios';
import wordpressConfig from '../../utils/wordpress.config';

export const fetchrollCagesImages = async () => {
  const URL = wordpressConfig.jsonUrl;
  const response = await axios.get(`${URL}cages`);
  return response.data;
};
