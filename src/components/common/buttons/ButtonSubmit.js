import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

const ButtonSubmit = ({
  text,
  type,
  disabled,
  loadingLogin,
  'data-test': dataTest
}) => {
  return (
    <button
      disabled={disabled}
      className={cx('buttonSubmit', `${loadingLogin ? 'buttonLoading' : ''}`)}
      type={type}
      data-test={dataTest}
    >
      {text}
    </button>
  );
};

ButtonSubmit.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  loadingLogin: PropTypes.bool
};

export default ButtonSubmit;
