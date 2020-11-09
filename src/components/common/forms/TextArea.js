import React from 'react';
import PropTypes from 'prop-types';

const TextArea = props => {
  const {
    cols, rows, placeholder, value, name, onChange, onBlur, maxLength,
  } = props;
  return (

    <textarea
      rows={rows}
      cols={cols}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      maxLength={maxLength}
    />
  );
};

TextArea.propTypes = {
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  rows: PropTypes.string.isRequired,
  cols: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  maxLength: PropTypes.string.isRequired,
};

export default TextArea;