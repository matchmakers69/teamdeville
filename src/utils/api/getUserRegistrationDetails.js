import axios from "axios";
import wordpressConfig from "../wordpress.config";

export const getUserRegistrationDetails = (
  username,
  email,
  nonce,
  displayName,
  password
) => {
  const URL = wordpressConfig.domainUrl;
  const USER_DETAILS_URL = `${URL}/api/user/register/?username=${username}&email=${email}&nonce=${nonce}&display_name=${displayName}&user_pass=${password}&insecure=cool&seconds=60`;
  const response = axios.get(USER_DETAILS_URL);
  return response;
};
