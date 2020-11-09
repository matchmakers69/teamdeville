import axios from 'axios';
import wordpressConfig from '../../utils/wordpress.config';

export const fetchRollCagesContent = async () => {
  const URL = wordpressConfig.jsonUrl;
  const response = await axios.get(`${URL}pages?slug=roll-cages`);
  return response.data[0];
};
