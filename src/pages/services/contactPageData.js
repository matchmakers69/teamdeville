import axios from 'axios';
import wordpressConfig from '../../utils/wordpress.config';

export const fetchContactPageData = async () => {
  const URL = wordpressConfig.jsonUrl;
  const res = await axios.get(`${URL}pages?slug=contact`);
  return res.data[0];
};
