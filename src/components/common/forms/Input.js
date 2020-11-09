import React from 'react';
import PropTypes from 'prop-types';

const Input = props => {
  const {
    id,
    type,
    placeholder,
    value,
    name,
    onChange,
    maxLength,
    'data-test': dataTest
  } = props;
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
      maxLength={maxLength}
      data-test={dataTest}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  maxLength: PropTypes.string
};

export default Input;
