import React from 'react';
import PropTypes from 'prop-types';
import styles from './Styles.module.scss';

const Select = ({
  'data-test': dataTest,
  value,
  name,
  placeholder,
  options,
  onChange,
  label
}) => {
  return (
    <>
      <label htmlFor='selectFilter'>{label}</label>
      <select
        className={styles.formControl}
        name={name}
        data-test={dataTest}
        value={value}
        onChange={onChange}
        id='selectFilter'
      >
        {placeholder && (
          <option disabled value=''>
            {placeholder}
          </option>
        )}
        {options.map((opt, i) => {
          const modifiedOption = opt.replace(' ', '').toLowerCase();
          return (
            <option key={`${modifiedOption}-${i + 1}`} value={opt}>
              {opt}
            </option>
          );
        })}
      </select>
    </>
  );
};

Select.propTypes = {};

export default Select;
