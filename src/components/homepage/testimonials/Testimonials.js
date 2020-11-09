import React, { Component, createRef } from 'react';
import {
  closeTestimonialsFormAfterSubmission,
  getUsersWhenTestimonialButtonClick,
  showTestimonialsFormContainer,
} from '../../../stores/testimonials/actions';
import { displayConfirmationModalAfterSubmission as displayConfirmationModalAfterSubmissionActions } from '../../../actions/actionsWoo';

import AddTestimonialDetails from './AddTestimonialDetails';
import { ButtonsDirection } from './ButtonsDirection';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SmallSpinner from '../../common/Loader/SmallSpinner';
import TestimonialsList from './TestimonialsList';
import _debounce from 'lodash/debounce';
import _isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import constants from '../../../constants';
import cx from 'classnames';
import { notLogged } from '../../../stores/auth/actions';
import { showPopup as showPopupActions } from '../../../actions/actionsPopUpInfo';
import styles from './Styles.module.scss';
import { getTestimonials } from '../../../components/homepage/testimonials/services/LatestTestimonials';
import { runAsyncAddNewTestimonial } from '../../../utils/api/updateTestimonialsPost';
import withToast from '../../../HOC/withToaster';

const values = {
  username: '',
  content: '',
};

class Testimonials extends Component {
  _isMounted = false;

  state = {
    testimonials: [],
    translateValue: 0,
    testimonilasContainerWidth: null,
    testimonialSlideIndex: 0,
    isDisabled: true,
    hasError: false,
    isSending: false,
    closeAfterSubmit: false,
    errorMessageSubmition: '',
    loading: true,
  };

  showLoginTipsPopUp = () => {
    this.props.showPopup({
      title: constants.LOGIN_TIPS_TITLE,
      description: constants.LOGIN_TIPS_DESCRIPTION,
    });
  };

  showModalAfterContactFormSent = () => {
    this.props.displayConfirmationModalAfterSubmission({
      modalTitle: constants.TESTIMONIAL_SUCCESS_TITLE,
      modalDescription: constants.TESTIMONIAL_INFO,
    });
  };

  testimonilasContainerRef = createRef();

  handleWindowResize = this.handleWindowResize.bind(this);

  handleWindowResizeDebounced = _debounce(this.handleWindowResize, 80);

  getTestimonialsContainerWidth = () => {
    const { current } = this.testimonilasContainerRef;
    const testimonialWidth = current.clientWidth;
    return testimonialWidth;
  };

  handleWindowResize() {
    const { testimonialSlideIndex } = this.state;
    const testimonialWidth = this.getTestimonialsContainerWidth();
    const translateValue = testimonialSlideIndex * testimonialWidth * -1;

    this.setState({
      translateValue,
      testimonilasContainerWidth: testimonialWidth,
    });
  }

  initSlider = () => {
    this.setState({
      testimonilasContainerWidth: this.getTestimonialsContainerWidth(),
    });
  };

  fetchTestimonials = async () => {
    try {
      const response = await getTestimonials();
      if (this._isMounted) {
        this.setState(
          {
            testimonials: response,
            loading: false,
          },
          () => {
            if (this.state.testimonials.length > 0) {
              this.initSlider();
              window.addEventListener(
                'resize',
                this.handleWindowResizeDebounced
              );
            }
          }
        );
      }
    } catch (error) {
      this.setState({
        hasError: true,
        isLoading: false,
      });

      this.props.addToast('Upps, something went wrong!', {
        appearance: 'error',
      });
    }
  };

  componentDidMount = () => {
    this._isMounted = true;
    this.fetchTestimonials();
  };

  componentWillUnmount = () => {
    this._isMounted = false;
    window.removeEventListener('resize', this.handleWindowResizeDebounced);
  };

  handleOpenTestimonialFormWithFetchingUsers = () => {
    const { getUsersWhenTestimonialButtonClick } = this.props;
    getUsersWhenTestimonialButtonClick();
  };

  handleCloseTestimonials = () => {
    this.props.closeTestimonialsFormAfterSubmission();
  };

  updateLoginStatus = () => {
    this.props.notLogged();
  };

  gotoNextPrev = (direction) => {
    const {
      testimonialSlideIndex,
      translateValue,
      testimonilasContainerWidth,
      testimonials,
    } = this.state;

    if (direction === 'prev') {
      this.setState({
        testimonialSlideIndex: testimonialSlideIndex - 1,
        translateValue: translateValue + testimonilasContainerWidth,
      });
      if (testimonialSlideIndex <= 0) {
        this.setState(
          {
            translateValue: 0,
            testimonialSlideIndex: 0,
            isDisabled: true,
          },
          () => {
            this.setState({});
          }
        );
      }
    } else {
      this.setState({
        testimonialSlideIndex: testimonialSlideIndex + 1,
        isDisabled: false,
        translateValue: parseInt(
          `-${(testimonialSlideIndex + 1) * testimonilasContainerWidth}px`,
          10
        ),
      });
      if (testimonialSlideIndex >= testimonials.length - 1) {
        this.setState({
          translateValue: 0,
          testimonialSlideIndex: 0,
          isDisabled: true,
        });
      }
    }
  };

  disablePrevButton = () => {
    const { testimonialSlideIndex } = this.state;
    if (testimonialSlideIndex <= 0) {
      return true;
    } else {
      return false;
    }
  };

  handleAddNewTestimonial = async (
    values,
    { resetForm, setStatus, setErrors }
  ) => {
    const { username, content } = values;
    const newTestimonial = {
      title: username,
      content: content,
      status: 'publish',
    };
    this.setState({
      isSending: true,
    });

    try {
      await runAsyncAddNewTestimonial(newTestimonial);
      const fetchUpdatedTestimonials = await getTestimonials();
      resetForm({});
      this.showModalAfterContactFormSent();
      setStatus({ success: true });
      this.setState({
        isSending: false,
        closeAfterSubmit: true,
        formSent: true,
      });

      if (this.state.formSent) {
        this.setState({
          testimonials: fetchUpdatedTestimonials,
        });
      }

      this.handleCloseTestimonials();
    } catch (error) {
      setStatus({ success: false });
      setErrors({ submit: error.message });

      if (error.response) {
        const {
          data: { data },
        } = error.response;
        const { status } = data;

        if (status === 403) {
          this.setState({
            errorMessageSubmition: `Your testimonial has not been added. Please contact with us`,
          });
        } else {
          this.setState({
            errorMessageSubmition: `Your testimonial has not been added. Please contact with us`,
          });
        }

        this.setState({
          isSending: false,
          closeAfterSubmit: false,
          formSent: false,
        });
        this.handleCloseTestimonials();
        this.updateLoginStatus();
      }
    }
  };

  render() {
    const {
      testimonials,
      translateValue,
      isSending,
      closeAfterSubmit,
      errorMessageSubmition,
      loading,
    } = this.state;

    const {
      user = {},
      hideTestimonialButton,
      showLoginButton,
      showAddTestimonialForm,
      isLoading,
      showButtonSpinner,
      showTestimonialsFormContainer,
    } = this.props;

    if (loading) {
      return <SmallSpinner />;
    }
    return (
      <section
        data-test='testimonials-section'
        className={styles.testimonialsSection}
      >
        <div className={cx('container', 'fluid', 'full')}>
          <div className='row'>
            <div className='col-xs-12'>
              <div className={cx(styles.colTestimonials)}>
                <ButtonsDirection
                  disabledPrev={this.disablePrevButton}
                  gotoNextPrev={this.gotoNextPrev}
                />

                <div className={styles.testimonialsMainContent}>
                  <header className='sectionHeader center-text'>
                    <h3
                      data-test='testimonialsTitle'
                      className='subSectionTitle border-full border-white whiteTitle'
                    >
                      Testimonials
                    </h3>
                  </header>
                  <div className={styles.testimonialsOuterWrapper}>
                    <div className={styles.testimonialsContainer}>
                      <div
                        ref={this.testimonilasContainerRef}
                        className={styles.testimonialsSliderTranslated}
                        style={{
                          transform: `translateX(${translateValue}px)`,
                          transition: 'transform ease-out 0.45s ',
                        }}
                      >
                        <TestimonialsList testimonials={testimonials} />
                      </div>
                    </div>

                    {!hideTestimonialButton && (
                      <div className='centerButtonPositioner'>
                        <button
                          onClick={() =>
                            this.handleOpenTestimonialFormWithFetchingUsers()
                          }
                          type='button'
                          className={cx(
                            'testimonialButton',
                            `${showButtonSpinner ? 'buttonLoading' : ''}`
                          )}
                        >
                          Add testimonial
                        </button>
                      </div>
                    )}

                    {showLoginButton && (
                      <div className='testimonilasActionsWrapper'>
                        <button
                          onClick={() => this.showLoginTipsPopUp()}
                          type='button'
                          className='popUpTipsBtn'
                        >
                          Login information
                        </button>
                        <Link
                          onClick={() => showTestimonialsFormContainer()}
                          to={constants.LOGIN_URL}
                          className='loggedIn'
                        >
                          Please login to add testimonial
                        </Link>
                      </div>
                    )}

                    <div className='testimonilasFormWrapper'>
                      {!_isEmpty(user) && !isLoading && (
                        <AddTestimonialDetails
                          hideTestimonialButton={hideTestimonialButton}
                          user={user}
                          showAddTestimonialForm={showAddTestimonialForm}
                          showButtonSpinner={showButtonSpinner}
                          handleAddNewTestimonial={this.handleAddNewTestimonial}
                          values={values}
                          isSending={isSending}
                          closeAfterSubmit={closeAfterSubmit}
                        />
                      )}
                    </div>

                    <span className='error-alert'>{errorMessageSubmition}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.testimonialsState,
});

const mapDispatchToProps = (dispatch) => ({
  showTestimonialsFormContainer: () =>
    dispatch(showTestimonialsFormContainer()),
  getUsersWhenTestimonialButtonClick: () =>
    dispatch(getUsersWhenTestimonialButtonClick()),
  showPopup: (config) => dispatch(showPopupActions(config)),
  closeTestimonialsFormAfterSubmission: () =>
    dispatch(closeTestimonialsFormAfterSubmission()),
  notLogged: () => dispatch(notLogged()),
  displayConfirmationModalAfterSubmission: (config) =>
    dispatch(displayConfirmationModalAfterSubmissionActions(config)),
});

Testimonials.defaultProps = {
  testimonials: [],
};

Testimonials.propTypes = {
  showTestimonialsFormContainer: PropTypes.func.isRequired,
  getUsersWhenTestimonialButtonClick: PropTypes.func.isRequired,
  testimonials: PropTypes.array.isRequired,
  displayConfirmationModalAfterSubmission: PropTypes.func.isRequired,
};

export default withToast(
  connect(mapStateToProps, mapDispatchToProps)(Testimonials)
);
