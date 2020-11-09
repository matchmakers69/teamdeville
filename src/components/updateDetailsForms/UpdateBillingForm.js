import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Styles.module.scss';

const UpdateBillingForm = ({
  onKeyDown,
  isValid,
  dirty,
  handleChange,
  handleSubmit,
  handleBlur,
  errors,
  values: {
    firstName,
    lastName,
    address,
    email,
    country,
    postalCode,
    city,
    state,
    phone
  },
  isSending
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      autoComplete='off'
      onKeyDown={onKeyDown}
      className={styles.updateBillingForm}
    >
      <div className={styles.inputsSpacer}>
        <label htmlFor='firstName'>First Name</label>
        <input
          id='firstName'
          placeholder='First Name'
          name='firstName'
          value={firstName}
          type='text'
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className={styles.formikErrors}>{errors.firstName}</span>
      </div>

      <div className={styles.inputsSpacer}>
        <label htmlFor='firstName'>Last Name</label>
        <input
          id='lastName'
          placeholder='Last Name'
          name='lastName'
          value={lastName}
          type='text'
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className={styles.formikErrors}>{errors.lastName}</span>
      </div>
      <div className={styles.inputsSpacer}>
        <label htmlFor='address'>Billing Address</label>
        <input
          id='address'
          placeholder='Billing Address'
          name='address'
          value={address}
          type='text'
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className={styles.formikErrors}>{errors.address}</span>
      </div>
      <div className={styles.inputsSpacer}>
        <label htmlFor='city'>City</label>
        <input
          id='city'
          placeholder='City'
          name='city'
          value={city}
          type='text'
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className={styles.formikErrors}>{errors.city}</span>
      </div>
      <div className={styles.inputsSpacer}>
        <label htmlFor='postalCode'>Post Code</label>
        <input
          id='postalCode'
          placeholder='Post Code'
          name='postalCode'
          value={postalCode}
          type='text'
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className={styles.formikErrors}>{errors.postalCode}</span>
      </div>
      <div className={styles.inputsSpacer}>
        <label htmlFor='state'>County</label>
        <input
          id='state'
          placeholder='County'
          name='state'
          value={state}
          type='text'
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className={styles.formikErrors}>{errors.state}</span>
      </div>
      <div className={styles.inputsSpacer}>
        <label htmlFor='country'>Billing Country</label>
        <input
          id='country'
          placeholder='Billing Country'
          name='country'
          value={country}
          type='text'
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className={styles.formikErrors}>{errors.country}</span>
      </div>
      <div className={styles.inputsSpacer}>
        <label htmlFor='email'>Your email</label>
        <input
          id='email'
          placeholder='Email'
          name='email'
          value={email}
          type='text'
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className={styles.formikErrors}>{errors.email}</span>
      </div>
      <div className={styles.inputsSpacer}>
        <label htmlFor='phone'>Phone</label>
        <input
          id='phone'
          placeholder='Phone'
          name='phone'
          value={phone}
          type='text'
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className={styles.formikErrors}>{errors.phone}</span>
      </div>
      <div className={styles.inputsSpacer}>
        <button
          className={cx(
            styles.submitAccountChangesButton,
            isSending ? styles.buttonLoading : ''
          )}
          disabled={!isValid || !dirty}
          type='submit'
        >
          Update details
        </button>
      </div>
      <div className={styles.inputsSpacer}>
        {isSending && <span>Your Billing details are updating!</span>}
      </div>
    </form>
  );
};

UpdateBillingForm.propTypes = {};

export default UpdateBillingForm;
