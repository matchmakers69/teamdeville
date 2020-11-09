import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';
import { withFormik } from 'formik';
import styles from './Styles.module.scss';
import FormTextArea from '../common/formikFields/FormTextArea';
import InputFormik from '../common/formikFields/InputFormik';
import * as Yup from 'yup';
import * as emailjs from 'emailjs-com';

const ContactForm = (props) => {
  const {
    values: { firstName, lastName, feedback, email, telephone },
    isSubmitting,
    handleSubmit,
    dirty,
  } = props;

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.orderForm}>
        <div className={styles.inputsSpacer}>
          <InputFormik
            label='First Name'
            name='firstName'
            type='text'
            value={firstName}
            placeholder='First Name'
          />
        </div>
        <div className={styles.inputsSpacer}>
          <InputFormik
            label='Last Name'
            name='lastName'
            type='text'
            value={lastName}
            placeholder='Last Name'
          />
        </div>

        <div className={styles.inputsSpacer}>
          <InputFormik
            label='Telephone'
            name='telephone'
            value={telephone}
            type='text'
            placeholder='Telephone'
          />
        </div>

        <div className={styles.inputsSpacer}>
          <InputFormik
            label='Email'
            placeholder='Email Address'
            name='email'
            value={email}
            type='text'
          />
        </div>

        <div className={styles.inputsSpacer}>
          <FormTextArea
            label='Message'
            name='feedback'
            rows='6'
            value={feedback}
            cols='30'
            placeholder='Please enter your message'
          />
        </div>
        <div className={styles.inputsSpacer}>
          <button
            className={cx(
              styles.submitAccountChangesButton,
              isSubmitting ? styles.buttonLoading : ''
            )}
            disabled={isSubmitting || !dirty}
            type='submit'
          >
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>
        </div>
        <div className={styles.inputsSpacer}>
          {isSubmitting && (
            <span className={styles.sendingOrderAlert}>
              Your message is pending!
            </span>
          )}
        </div>
      </form>
    </>
  );
};

const ContactFormWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const {
      values: { firstName, lastName, feedback, email, telephone },
    } = props;

    return {
      firstName,
      lastName,
      feedback,
      email,
      telephone,
    };
  },

  validationSchema: Yup.object().shape({
    firstName: Yup.string()
      .matches(/^[a-zA-Z_]+( [a-zA-Z_]+)*$/, {
        message: 'Enter Valid First Name',
        excludeEmptyString: true,
      })
      .min(2, 'Must be at least 2 characters')
      .max(20, 'Sorry, it is too long')
      .required('Please enter your First Name'),

    lastName: Yup.string()
      .matches(/^[a-zA-Z_]+( [a-zA-Z_]+)*$/, {
        message: 'Enter Valid Last Name',
        excludeEmptyString: true,
      })
      .min(2, 'Must be at least 2 characters')
      .max(30, 'Sorry, it is too long')
      .required('Please enter your Last Name'),

    feedback: Yup.string()
      .min(30, 'Must be at least 30 characters')
      .max(600, 'Maximum 600 characters')
      .required('Message is required'),

    telephone: Yup.string()
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        {
          message: "That doesn't look like a phone number",
          excludeEmptyString: true,
        }
      )
      .min(4, 'Minimum 4 characters')
      .max(20, 'Maximum 10 characters'),

    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
  }),

  handleSubmit: (
    values,

    {
      setSubmitting,
      setErrors,
      errors,
      props,
      setStatus,
      resetForm,
      setFieldTouched,
    }
  ) => {
    const { firstName, lastName, feedback, email, telephone } = values;
    const templateId = 'teamdeville_email';
    const SHOPPING_LIST_URL = /shopping-list/.test(window.location.pathname);

    const {
      disableContactFormAfterSubmission,
      showModalAfterContactFormSent,
      resetShippingDetails,
      sendingEmailFailded,
    } = props;
    const sendFeedback = (templateId, variables) => {
      setSubmitting(true);
      if (emailjs) {
        emailjs
          .send(
            'default_service',
            templateId,
            variables,
            'user_7Xq58eEK9C9yTWsGOFiQI'
          )
          .then(() => {
            if (SHOPPING_LIST_URL) {
              resetShippingDetails(null);
            }

            showModalAfterContactFormSent();
            resetForm({});
            setStatus({ success: true });
            setSubmitting(false);
          });
      } else {
        sendingEmailFailded();
        props.history.push('/email-error');
      }
    };
    setFieldTouched();
    if (errors) {
      setSubmitting(false);

      setErrors({
        firstName: 'ERR',
        lastName: 'ERR',
      });
    }

    const delay = (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };
    const sendEmailRequest = new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve('done');
      });
    }, 2500);

    sendEmailRequest;
    delay(1000)
      .then(() => {
        sendFeedback(templateId, {
          message_html: feedback,
          first_name: firstName,
          last_name: lastName,
          reply_to: email,
          phone_number: telephone,
        });

        if (SHOPPING_LIST_URL) {
          setTimeout(() => {
            disableContactFormAfterSubmission();
          }, 2500);
        }
      })
      .catch((error) => console.log(error));
  },
})(ContactForm);

ContactForm.propTypes = {
  values: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    feedback: PropTypes.string,
    email: PropTypes.string,
    telephone: PropTypes.string,
  }),
  errors: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    feedback: PropTypes.string,
  }),
  isSubmitting: PropTypes.bool.isRequired,
  touched: PropTypes.object.isRequired,
};
export default withRouter(ContactFormWithFormik);
