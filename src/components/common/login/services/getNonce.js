import axios from 'axios';
import wordpressConfig from '../../../../utils/wordpress.config';

export const fetchUserNonce = async (
  username,
  email,
  nonce,
  displayName,
  password
) => {
  const URL = wordpressConfig.domainUrl;
  const response = await axios.get(
    `${URL}/api/user/register/?username=${username}&email=${email}&nonce=${nonce}&display_name=${displayName}&user_pass=${password}&insecure=cool`
  );
  return response.data;
};
