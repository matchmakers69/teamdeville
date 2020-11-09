import React, { useState, useEffect } from 'react';
import SpinnerIcon from './Loader/SpinnerIcon';
import cx from 'classnames';
import styles from './Styles.module.scss';

const DelayedFallback = () => {
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    let timeout = setTimeout(() => setisLoading(false), 1200);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
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
};

export default DelayedFallback;
