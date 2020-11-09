export const AUTH_TOKEN = `${window.location.host}/AUTH_TOKEN`;

export const setUsernameToken = (token) => {
  if (localStorage) {
    localStorage.setItem(AUTH_TOKEN, JSON.stringify(token));
  }
};

export const getUsernameToken = () => {
  if (localStorage) {
    return JSON.parse(localStorage.getItem(AUTH_TOKEN));
  }
  return null;
};

export const removeUsernameToken = () => {
  if (localStorage) {
    localStorage.removeItem(AUTH_TOKEN);
  }
};
