import PropTypes from 'prop-types';
import React from 'react';
import SpinnerIcon from './Loader/SpinnerIcon';
import cx from 'classnames';
import styles from './Styles.module.scss';

const Loader = ({ children, isLoading }) => {
  if (isLoading) {
    return (
      <div
        className={cx(
          styles.preloaderContent,
          `${isLoading ? styles.loaderVisible : styles.loaderNonVisible}`
        )}
      >
        <div className={styles.preloaderInner}>
          <div className={styles.spinnerWrapper}>
            <SpinnerIcon />
          </div>
        </div>
      </div>
    );
  }
  return children;
};

Loader.propsTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Loader;
