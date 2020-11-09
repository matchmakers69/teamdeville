import Input from '../../common/forms/Input';
import PropTypes from 'prop-types';
import React from 'react';
import TextArea from '../../common/forms/TextArea';
import cx from 'classnames';
import styles from './Styles.module.scss';

const AddTestimonialForm = ({
  isValid,
  dirty,
  handleChange,
  handleSubmit,
  handleBlur,
  errors,
  values: { username, content },
  isSending,
}) => {
  return (
    <form onSubmit={handleSubmit} autoComplete='off' className='addNewDataForm'>
      <div className='formFieldSeparator'>
        <label htmlFor='inputUsername' className='formLabel lightLabel'>
          Your name
        </label>
        <Input
          type='text'
          placeholder='Your name'
          value={username}
          name='username'
          id='inputUsername'
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength='40'
        />
        <span className={styles.formikErrors}>{errors.username}</span>
      </div>

      <div className='formFieldSeparator'>
        <label
          htmlFor='inputTestimonialMessage'
          className='formLabel lightLabel'
        >
          Your testimonial
        </label>
        <TextArea
          value={content}
          name='content'
          onChange={handleChange}
          placeholder='Please enter your testimonial'
          rows='4'
          cols='50'
          maxLength='500'
          onBlur={handleBlur}
        />
        <span className={styles.formikErrors}>{errors.content}</span>
      </div>
      <div className='formFieldSeparator'>
        <button
          className={cx(
            'testimonialButton',
            `${isSending ? 'buttonLoading' : ''}`
          )}
          type='submit'
          disabled={!isValid || !dirty}
        >
          Add testimonial
        </button>
      </div>
    </form>
  );
};

AddTestimonialForm.propTypes = {
  values: PropTypes.shape({
    username: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
  isSending: PropTypes.bool.isRequired,
};

export default AddTestimonialForm;
