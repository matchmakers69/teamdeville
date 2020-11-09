/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Svg from '../../svg';
import styles from './Styles.module.scss';

export const TYPES = {
  SLIDER: cx(styles.absolutePosition),
  ROTATOR: cx(styles.relativePosition)
};

export const SIZES = {
  LARGE: cx(styles.largeIndButton),
  MEDIUM: cx(styles.mediumIndButton),
  SMALL: cx(styles.smallIndButton)
};

export const COLORS = {
  DARK: cx(styles.darkIndButton),
  ORANGE: cx(styles.orangeIndButton),
  BLACK: cx(styles.blackIndButton)
};

const ButtonSlideNext = ({
  type,
  buttonColor,
  handleButtonClick,
  buttonSize,
  buttonType,
  disabled
}) => (
  <button
    className={cx(
      styles.buttonIndicator,
      styles.arrowNext,
      [buttonColor],
      [buttonSize],
      [buttonType]
    )}
    type={type}
    disabled={disabled}
    onClick={() => handleButtonClick()}
  >
    <Svg name='arrowNext' />
  </button>
);

ButtonSlideNext.propTypes = {
  handleButtonClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  buttonColor: PropTypes.string.isRequired,
  buttonSize: PropTypes.string.isRequired,
  buttonType: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default ButtonSlideNext;
