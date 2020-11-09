import axios from 'axios';
import wordpressConfig from '../../../utils/wordpress.config';

export const getShoppingPageData = async () => {
  const URL = wordpressConfig.jsonUrl;
  const shoppingPageResponse = await axios.get(
    `${URL}pages?slug=shopping-list`
  );
  return shoppingPageResponse.data[0];
};
