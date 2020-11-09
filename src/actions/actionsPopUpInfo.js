export const OPEN_POPUP = 'OPEN_POPUP';
export const CLOSE_POP = 'CLOSE_POP';
const BODY_TAG = document.body;
import {
  OPEN_MODAL_MOVED_TO_SHOPPING_LIST,
  CLOSE_MODAL_MOVED_TO_SHOPPING_LIST,
  SENDING_EMAIL_FAILED,
  RESET_EMAIL_FAILED,
} from './types';

export const showPopup = ({ ...config }) => (dispatch) => {
  dispatch({
    type: 'OPEN_POPUP',
    ...config,
  });
};

export const closePopup = () => (dispatch) => {
  BODY_TAG.classList.remove('body-hidden');
  dispatch({
    type: CLOSE_POP,
  });
  dispatch({
    type: 'CLOSE_PAGE_FADER',
  });
};

const closeModalInformation = () => ({
  type: CLOSE_MODAL_MOVED_TO_SHOPPING_LIST,
});

export const openModalInfo = ({ ...config }) => (dispatch) => {
  dispatch({
    type: OPEN_MODAL_MOVED_TO_SHOPPING_LIST,
    ...config,
  });
  setTimeout(() => {
    dispatch(closeModalInformation());
  }, 3500);
};

export const closeModalInfo = () => (dispatch) => {
  dispatch(closeModalInformation());
};

export const formSubmissionFailed = () => ({
  type: SENDING_EMAIL_FAILED,
});

export const resetFormSubmissionFailed = () => ({
  type: RESET_EMAIL_FAILED,
});
