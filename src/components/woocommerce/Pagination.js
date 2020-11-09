import React from 'react';
import cx from 'classnames';
import styles from './Styles.module.scss';
import Svg from '../svg';
import PropTypes from 'prop-types';

const Pagination = ({ page, handlePaginationClick, productsPerPage }) => {
  const isPrevButtonDisabled = () => page <= 1;
  const isNextButtonDisabled = () => page >= productsPerPage.length - 1;
  return (
    <div className={styles.paginationButtonInner}>
      <div className={styles.paginationWrapperInner}>
        <div className={styles.indicatorInfoWrapper}>
          <span className={styles.arrowInfo}>Go to next / prev page</span>
        </div>
        <div className={styles.indicatorButtonsContainer}>
          <button
            className={cx(
              styles.buttonIndicator,
              styles.arrowNext,
              styles.orangeIndButton,
              styles.mediumIndButton
            )}
            type='button'
            disabled={isPrevButtonDisabled()}
            onClick={() => handlePaginationClick('prev')}
          >
            <Svg name='arrowPrev' />
          </button>
          <div className={cx(styles.buttonCounter, styles.buttonNumber)}>
            <span className={styles.pageNumber}>{page}</span>
          </div>
          <div className={cx(styles.buttonCounter, styles.buttonDots)}>
            <span className={styles.pageDots}>...</span>
          </div>

          <button
            className={cx(
              styles.buttonIndicator,
              styles.arrowNext,
              styles.orangeIndButton,
              styles.mediumIndButton
            )}
            type='button'
            disabled={isNextButtonDisabled()}
            onClick={() => handlePaginationClick('next')}
          >
            <Svg name='arrowNext' />
          </button>
        </div>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  handlePaginationClick: PropTypes.func.isRequired,
};

export default Pagination;
