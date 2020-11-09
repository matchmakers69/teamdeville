import React from 'react';
import PropTypes from 'prop-types';
import styles from './Styles.module.scss';

const CheckboxContactForm = ({
  isChecked,
  handleInputCheckboxChange,
  text,
}) => {
  return (
    <label
      role='button'
      htmlFor='contactFormCheckbox'
      className={styles.checkboxLabel}
    >
      <input
        onChange={(e) => handleInputCheckboxChange(e, isChecked)}
        id='contactFormCheckbox'
        checked={isChecked}
        type='checkbox'
        name='isChecked'
        className={styles.inputCheckbox}
      />
      <span className={styles.checkboxText}>{text}</span>
    </label>
  );
};

CheckboxContactForm.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  handleInputCheckboxChange: PropTypes.func.isRequired,
};

export default CheckboxContactForm;
