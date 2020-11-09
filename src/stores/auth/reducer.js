import {
  CLOSE_BODY_FADE,
  CLOSE_PAGE_FADER,
  LOGIN_IN_PROCESS,
  LOGOUT_USER,
  RENDER_ERRORS_SUBMISSION,
  TOGGLE_BODY_FADE,
  TOGGLE_PAGE_FADER,
  USER_LOGIN_SUCCESS,
  USER_SIGNIN_FAIL,
} from './types';

const initialState = {
  faderIsOpened: false,
  bodyFade: false,
  isLoading: false,
  newUsername: '',
  newUsernameValid: false,
  newPassword: '',
  newPasswordValid: false,
  userNiceName: '',
  userEmail: '',
  loggedIn: false,
  error: '',
  token: '',
  showErrors: false,
  redirectURL: '/',
  loadingLogin: false,
};

export default function authReducer(state = initialState, action) {
  const {
    faderIsOpened,
    bodyFade,
    name,
    value,
    error,
    token,
    userNiceName,
    userEmail,
    loggedIn,
    showErrors,
    redirectURL,
    loadingLogin,
  } = action.payload || {};
  switch (action.type) {
    case TOGGLE_PAGE_FADER:
      return {
        ...state,
        faderIsOpened: !state.faderIsOpened,
        bodyFade: false,
      };
    case CLOSE_PAGE_FADER:
      return {
        ...state,
        faderIsOpened: false,
        bodyFade: false,
      };
    case TOGGLE_BODY_FADE:
      return {
        ...state,
        bodyFade: !state.bodyFade,
        faderIsOpened: false,
      };

    case CLOSE_BODY_FADE:
      return {
        ...state,
        bodyFade: false,
      };

    case LOGIN_IN_PROCESS:
      return {
        ...state,
        loadingLogin,
      };

    case RENDER_ERRORS_SUBMISSION:
      return {
        ...state,
        error,
        loadingLogin,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        token,
        userNiceName,
        userEmail,
        loggedIn,
        showErrors,
        newUsername: '',
        newUsernameValid: false,
        newPassword: '',
        newPasswordValid: false,
      };

    case USER_SIGNIN_FAIL:
      return {
        ...state,
        error,
        newUsername: '',
        newUsernameValid: false,
        newPassword: '',
        newPasswordValid: false,
        showErrors,
        token,
        userNiceName,
        userEmail,
        loadingLogin,
      };

    case LOGOUT_USER:
      return {
        ...state,
        token,
        userNiceName,
        userEmail,
        loggedIn,
        faderIsOpened,
        bodyFade,
        redirectURL,
        showErrors,
        loadingLogin,
      };

    case 'NOT_LOGGED_IN_AFTER_TESTIMONIAL_ADDING_FAILS':
      return {
        ...state,
        loggedIn: false,
        token: '',
        error: '',
        userEmail: '',
        userNiceName: '',
        loadingLogin: false,
      };
    default:
      return {
        ...state,
      };
  }
}
