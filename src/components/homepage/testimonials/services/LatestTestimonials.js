import axios from 'axios';
import wordpressConfig from '../../../../utils/wordpress.config';

export const getTestimonials = async () => {
  const URL = wordpressConfig.jsonUrl;
  const response = await axios.get(`${URL}testimonials`);
  return response.data;
};
