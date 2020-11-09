import axios from 'axios';
import wordpressConfig from '../wordpress.config';
const URL = wordpressConfig.jsonUrl;

export const runAsyncAddNewTestimonial = async (newTestimonial) => {
  const tokenFromStorage = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenFromStorage}`,
  };
  const res = await axios.post(`${URL}testimonials`, newTestimonial, {
    headers,
  });
  return res;
};
