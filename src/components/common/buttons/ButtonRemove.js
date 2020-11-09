import React from 'react';
import styles from './Styles.module.scss';

const ButtonRemove = ({ type, handleRemove, param, text }) => {
  return (
    <button
      className={styles.removeButton}
      onClick={() => handleRemove(param)}
      type={type}
    >
      <span className={styles.buttonText}>{text}</span>
    </button>
  );
};

export default ButtonRemove;
