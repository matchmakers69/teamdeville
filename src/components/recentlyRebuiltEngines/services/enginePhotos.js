import axios from 'axios';
import wordpressConfig from '../../../utils/wordpress.config';

export const fetchEnginePhotos = async (featured_media) => {
  const URL = wordpressConfig.jsonUrl;
  const response = await axios.get(`${URL}media/${featured_media}`);
  return response.data;
};
