import {
  CLOSE_TESTIMONIALS_AFTER_SUBMISSION,
  FETCH_USERS_REQUEST,
  GET_USER_FAILED,
  SHOW_ADD_TESTIMONIALS_BUTTON
} from './types';

export const showTestimonialsFormContainer = () => {
  return {
    type: SHOW_ADD_TESTIMONIALS_BUTTON,
    payload: {
      hideTestimonialButton: false,
      showLoginButton: false,
      showButtonSpinner: false
    }
  };
};

export const getUsersWhenTestimonialButtonClick = () => {
  return {
    type: FETCH_USERS_REQUEST
  };
};

export const showInfoWhenNoUserFound = () => {
  return {
    type: GET_USER_FAILED,
    payload: {
      error: true,
      isLoading: false,
      showLoginButton: true,
      showButtonSpinner: false
    }
  };
};

export const closeTestimonialsFormAfterSubmission = () => {
  return {
    type: CLOSE_TESTIMONIALS_AFTER_SUBMISSION,
    payload: {
      hideTestimonialButton: false,
      showAddTestimonialForm: false
    }
  };
};
