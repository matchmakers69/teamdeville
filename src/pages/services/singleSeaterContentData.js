import axios from 'axios';
import wordpressConfig from '../../utils/wordpress.config';

export const fetchSingleSeaterData = async () => {
  const URL = wordpressConfig.jsonUrl;
  const response = await axios.get(`${URL}pages?slug=single-seater-moulds`);
  return response.data[0];
};
