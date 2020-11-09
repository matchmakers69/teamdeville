import React from 'react';
import PropTypes from 'prop-types';
import styles from './Styles.module.scss';
import cx from 'classnames';
import Svg from '../../svg';

export const ButtonsDirection = ({ disabledPrev, gotoNextPrev }) => {
  ButtonsDirection.propTypes = {
    disabledPrev: PropTypes.func.isRequired,
    gotoNextPrev: PropTypes.func.isRequired
  };
  return (
    <>
      <button
        data-test='button-prev'
        disabled={disabledPrev()}
        className={cx(styles.arrowTestimonial, styles.arrowPrev)}
        onClick={() => gotoNextPrev('prev')}
        type='button'
      >
        <Svg name='arrowPrev' />
      </button>
      <button
        data-test='button-next'
        className={cx(styles.arrowTestimonial, styles.arrowNext)}
        onClick={() => gotoNextPrev('next')}
        type='button'
      >
        <Svg name='arrowNext' />
      </button>
    </>
  );
};
