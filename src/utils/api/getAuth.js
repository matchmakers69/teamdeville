import { delete as del, get, post, put } from 'axios';
import wordpressConfig from '../wordpress.config';
export const getAuthJWT = async (newUsername, newPassword) => {
  const { domainUrl } = wordpressConfig;

  const userLoginDetails = {
    username: newUsername,
    password: newPassword
  };

  const response = await post(
    `${domainUrl}/wp-json/jwt-auth/v1/token`,
    userLoginDetails
  );
  return response.data;
};
