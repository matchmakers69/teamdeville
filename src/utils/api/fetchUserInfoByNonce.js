import axios from "axios";
import wordpressConfig from "../wordpress.config";

export const getUserObjectWithNonce = async () => {
  const URL = wordpressConfig.domainUrl;
  const res = await axios.get(
    `${URL}/api/get_nonce/?controller=user&method=register`
  );
  return res.data;
};
