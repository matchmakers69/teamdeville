import React from 'react';
import cx from 'classnames';

const Label = props => {
  const { id, label, valid } = props;
  return (
    <label className={cx('formLabel', `${!valid ? 'labelError' : ''}`)} htmlFor={id}>{label}</label>
  );
};

export default Label;