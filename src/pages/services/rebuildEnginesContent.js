import axios from 'axios';
import wordpressConfig from '../../utils/wordpress.config';

export const fetchEnginesContentData = async () => {
  const URL = wordpressConfig.jsonUrl;
  const response = await axios.get(`${URL}pages?slug=engine-building-service`);
  return response.data[0];
};
