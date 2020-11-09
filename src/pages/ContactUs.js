import { ContactDetails } from '../components/contactDetails';
import { ContactForm } from '../components/contactForm';
import { ContactMap } from '../components/contactMap';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import constants from '../constants';
import cx from 'classnames';
import { displayConfirmationModalAfterSubmission as displayConfirmationModalAfterSubmissionActions } from '../actions/actionsWoo';
import { formSubmissionFailed as formSubmissionFailedActions } from '../actions/actionsPopUpInfo';
import { formValues } from './services/contactFormValues';

const ContactUs = ({
  displayConfirmationModalAfterSubmission,
  formSubmissionFailed,
}) => {
  const { EMAIL_SUBMISSION_SUCCESS, EMAIL_CONFIRMATION_DETAILS } = constants;
  const values = formValues();

  const showModalAfterContactFormSent = () => {
    displayConfirmationModalAfterSubmission({
      modalTitle: EMAIL_SUBMISSION_SUCCESS,
      modalDescription: EMAIL_CONFIRMATION_DETAILS,
    });
  };

  const sendingEmailFailded = () => {
    formSubmissionFailed();
  };

  return (
    <section
      data-section='primary'
      data-test='contact-section'
      className={cx('section', 'top__indent-large')}
    >
      <div className={cx('container', 'fluid')}>
        <div className={cx('row')}>
          <div className='col-xs-12'>
            <header className='sectionHeader'>
              <h2 className='sectionTitle'>Contact Us</h2>
            </header>
          </div>
        </div>
      </div>
      <div className={cx('container', 'fluid')}>
        <div className={cx('row')}>
          <div className={cx('col-xs-12', 'col-md-6')}>
            <section className='pageInnerSection'>
              <header className='pageHeader'>
                <h3 className='pageSectionTitle'>Company details</h3>
              </header>
              <ContactDetails />
            </section>
          </div>
          <div className={cx('col-xs-12', 'col-md-6')}>
            <section className='pageInnerSection'>
              <header className='pageHeader'>
                <h3 className='pageSectionTitle'>Please fill contact form</h3>
              </header>
              <ContactForm
                showModalAfterContactFormSent={showModalAfterContactFormSent}
                values={values}
                sendingEmailFailded={sendingEmailFailded}
              />
            </section>
          </div>
        </div>
      </div>
      <div className={cx('container', 'full', 'no-padding')}>
        <div className={cx('row')}>
          <div className='col-xs-12'>
            <ContactMap />
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  isConfirmationModalOpened: state.wooState.isConfirmationModalOpened,
});

const mapDispatchToProps = (dispatch) => ({
  displayConfirmationModalAfterSubmission: (config) =>
    dispatch(displayConfirmationModalAfterSubmissionActions(config)),
  formSubmissionFailed: () => dispatch(formSubmissionFailedActions()),
});

ContactUs.propTypes = {
  isConfirmationModalOpened: PropTypes.bool.isRequired,
  displayConfirmationModalAfterSubmission: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
