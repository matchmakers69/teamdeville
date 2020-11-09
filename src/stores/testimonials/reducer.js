import {
  CLOSE_TESTIMONIALS_AFTER_SUBMISSION,
  FETCH_USERS_REQUEST_SUCCESS,
  GET_USERNAME_DETAILS,
  GET_USER_FAILED,
  SHOW_ADD_TESTIMONIALS_BUTTON,
  SHOW_SPINNER_WHEN_FETCHING_PROGRESS
} from './types';

const initialState = {
  users: [],
  user: {},
  hideTestimonialButton: false,
  showLoginButton: false,
  showAddTestimonialForm: false,
  isLoading: true,
  showButtonSpinner: false,
  error: false
};

export default function testimonialsReducer(state = initialState, action) {
  const {
    isLoading,
    users,
    error,
    user,
    hideTestimonialButton,
    showLoginButton,
    showAddTestimonialForm,
    showButtonSpinner
  } = action.payload || {};
  switch (action.type) {
    case SHOW_ADD_TESTIMONIALS_BUTTON:
      return {
        ...state,
        hideTestimonialButton,
        showLoginButton,
        showButtonSpinner
      };
    case FETCH_USERS_REQUEST_SUCCESS:
      return {
        ...state,
        users,
        isLoading
      };
    case SHOW_SPINNER_WHEN_FETCHING_PROGRESS:
      return {
        ...state,
        showButtonSpinner
      };
    case GET_USERNAME_DETAILS:
      return {
        ...state,
        user,
        hideTestimonialButton,
        isLoading,
        error,
        showButtonSpinner,
        showAddTestimonialForm
      };
    case GET_USER_FAILED:
      return {
        ...state,
        isLoading,
        error,
        showLoginButton,
        showButtonSpinner
      };
    case CLOSE_TESTIMONIALS_AFTER_SUBMISSION:
      return {
        ...state,
        hideTestimonialButton,
        showAddTestimonialForm
      };

    default:
      return state;
  }
}
