import React from 'react';
import styles from './Styles.module.scss';

const InputQuickSearch = props => {
  const { value, name, placeholder, onChange, label, type, min, max } = props;
  return (
    <>
      <label>{label}</label>
      <input
        name={name}
        onChange={event => onChange(event)}
        placeholder={placeholder}
        value={value}
        className={styles.textInput}
        type={type}
        min={min}
        max={max}
      />
    </>
  );
};

export default InputQuickSearch;
