import axios from 'axios';
import wordpressConfig from '../wordpress.config';
const URL = wordpressConfig.jsonUrl;

export const getProfileUsers = async () => {
  const response = await axios.get(`${URL}users?per_page=100`);
  return response.data;
};
