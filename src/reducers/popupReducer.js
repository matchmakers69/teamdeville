import { OPEN_POPUP, CLOSE_POP } from '../actions/actionsPopUpInfo';
import {
  OPEN_MODAL_MOVED_TO_SHOPPING_LIST,
  CLOSE_MODAL_MOVED_TO_SHOPPING_LIST,
  SENDING_EMAIL_FAILED,
  RESET_EMAIL_FAILED,
} from '../actions/types';

const initialState = {
  open: false,
  title: '',
  description: '',
  modalInfoOpended: false,
  modalAlertHeader: '',
  modalAlert: '',
  emailHasErrors: false,
};

export default function popupReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_POPUP:
      return {
        ...state,
        open: true,
        title: action.title,
        description: action.description,
      };
    case CLOSE_POP:
      return {
        ...state,
        open: false,
      };
    case 'CLOSE_PAGE_FADER':
      return {
        ...state,
        bodyFade: false,
      };
    case OPEN_MODAL_MOVED_TO_SHOPPING_LIST:
      return {
        ...state,
        modalInfoOpended: true,
        modalAlert: action.modalAlert,
        modalAlertHeader: action.modalAlertHeader,
      };
    case CLOSE_MODAL_MOVED_TO_SHOPPING_LIST:
      return {
        ...state,
        modalInfoOpended: false,
      };
    case SENDING_EMAIL_FAILED:
      return {
        ...state,
        emailHasErrors: true,
      };
    case RESET_EMAIL_FAILED:
      return {
        ...state,
        emailHasErrors: false,
      };
    default:
      return {
        ...state,
      };
  }
}
