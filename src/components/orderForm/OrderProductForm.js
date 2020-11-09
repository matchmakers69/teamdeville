import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import styles from './Styles.module.scss';

const OrderProductForm = ({
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
    city,
    state,
    postalCode,
    country,
    email,
  },
  isSending,
}) => {
  return (
    <form onSubmit={handleSubmit} className={styles.orderForm}>
      <div className={styles.inputsSpacer}>
        <label htmlFor='firstNameId'>First Name</label>
        <input
          id='firstNameId'
          placeholder='First Name'
          name='firstName'
          value={firstName}
          type='text'
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className={styles.error}>{errors.firstName}</span>
      </div>
      <div className={styles.inputsSpacer}>
        <label htmlFor='lastNameId'>Last Name</label>
        <input
          id='lastNameId'
          placeholder='Last Name'
          name='lastName'
          value={lastName}
          type='text'
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className={styles.error}>{errors.lastName}</span>
      </div>
      <div className={styles.inputsSpacer}>
        <label htmlFor='addressId'>Address Line</label>
        <input
          id='addressId'
          placeholder='Address Line'
          name='address'
          value={address}
          type='text'
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className={styles.error}>{errors.address}</span>
      </div>
      <div className={styles.inputsSpacer}>
        <label htmlFor='cityId'>Town/City</label>
        <input
          id='cityId'
          placeholder='Town/City'
          name='city'
          value={city}
          type='text'
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className={styles.error}>{errors.city}</span>
      </div>
      <div className={styles.inputsSpacer}>
        <label htmlFor='stateId'>State/Province</label>
        <input
          id='stateId'
          placeholder='State/Province'
          name='state'
          value={state}
          type='text'
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className={styles.error}>{errors.state}</span>
      </div>
      <div className={styles.inputsSpacer}>
        <label htmlFor='postalCodeId'>ZIP/Postcode</label>
        <input
          id='postalCodeId'
          placeholder='ZIP/Postcode'
          name='postalCode'
          value={postalCode}
          type='text'
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className={styles.error}>{errors.postalCode}</span>
      </div>
      <div className={styles.inputsSpacer}>
        <label htmlFor='countryId'>Country</label>
        <input
          id='countryId'
          placeholder='Country'
          name='country'
          value={country}
          type='text'
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className={styles.error}>{errors.country}</span>
      </div>
      <div className={styles.inputsSpacer}>
        <label htmlFor='emailId'>Email</label>
        <input
          id='emailId'
          placeholder='Email'
          name='email'
          value={email}
          type='text'
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className={styles.error}>{errors.email}</span>
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
          Send order
        </button>
      </div>
      <div className={styles.inputsSpacer}>
        {isSending && (
          <span className={styles.sendingOrderAlert}>
            Your order is pending!
          </span>
        )}
      </div>
    </form>
  );
};

OrderProductForm.propTypes = {
  values: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    address: PropTypes.string,

    city: PropTypes.string,
    state: PropTypes.string,
    postalCode: PropTypes.string,
    country: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  isSending: PropTypes.bool.isRequired,
};

export default OrderProductForm;
