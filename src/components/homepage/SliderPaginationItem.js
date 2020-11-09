import React from 'react';
import cx from 'classnames';
import styles from './Styles.module.scss';


const SliderPaginationItem = props => {
  const {
    pag, index, currentSlideIndex, changeSlideOnClick,
  } = props;

  return (
    <button
      onClick={() => changeSlideOnClick(index)}
      className={cx(styles.pagButton, `${index === currentSlideIndex ? styles.activePag : null}`)}
      type="button"
    >
      <span className={styles.paginationDot} />
    </button>
  );
};

export default SliderPaginationItem;
