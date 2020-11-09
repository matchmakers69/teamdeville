import {
  CLOSE_BODY_FADE,
  CLOSE_PAGE_FADER,
  LOGOUT_USER_REQUEST,
  TOGGLE_BODY_FADE,
  TOGGLE_PAGE_FADER,
} from './types';

const BODY_TAG = document.body;
import { removeUsernameToken } from '../../utils/tokens/tokens';

export const openPageFader = (faderIsOpened, bodyFade) => {
  BODY_TAG.classList.toggle('body-hidden');
  return {
    type: TOGGLE_PAGE_FADER,
    payload: {
      faderIsOpened,
      bodyFade,
    },
  };
};

export const closePageFader = (faderIsOpened, bodyFade) => {
  BODY_TAG.classList.remove('body-hidden');
  return {
    type: CLOSE_PAGE_FADER,
    payload: {
      faderIsOpened,
      bodyFade,
    },
  };
};

export const toggleFadingBody = (bodyFade, faderIsOpened) => {
  BODY_TAG.classList.toggle('body-hidden');
  return {
    type: TOGGLE_BODY_FADE,
    payload: {
      bodyFade,
      faderIsOpened,
    },
  };
};

export const closeBodyFade = (bodyFade) => {
  BODY_TAG.classList.remove('body-hidden');
  return {
    type: CLOSE_BODY_FADE,
    payload: {
      bodyFade,
    },
  };
};

export const logoutUser = () => {
  removeUsernameToken();
  BODY_TAG.classList.remove('body-hidden');

  return {
    type: LOGOUT_USER_REQUEST,
  };
};

export const notLogged = () => {
  return {
    type: 'NOT_LOGGED_IN_AFTER_TESTIMONIAL_ADDING_FAILS',
  };
};
