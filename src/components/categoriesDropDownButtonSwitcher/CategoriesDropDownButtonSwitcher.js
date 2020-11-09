import PropTypes from 'prop-types';
import React from 'react';
import Svg from '../svg';
import cx from 'classnames';
import styles from './Styles.module.scss';

const CategoriesDropDownButtonSwitcher = ({ faderIsOpened }) => (
  <>
    <div className={cx(styles.buttonContainer, styles.wooCommerceButton)}>
      <div className={styles.wooButton}>
        <span className={styles.mobileCatIcon}>
          <Svg name='categoryIcon' />
        </span>
        <span className={styles.viewCategoriesText}>Our Products</span>
        <span className={styles.arrowDownIcon}>
          <Svg name='arrowDown' />
        </span>
      </div>
    </div>
    <div
      className={cx(
        styles.switcherWrapper,
        `${faderIsOpened ? styles.openCategoryNav : ''}`
      )}
    >
      <div className={styles.hamburgerSwitcherWrapper}>
        <div className={styles.hamburgerSwitcherBar} />
        <div className={styles.hamburgerSwitcherBar} />
        <div className={styles.hamburgerSwitcherBar} />
      </div>
    </div>
  </>
);

CategoriesDropDownButtonSwitcher.propTypes = {
  faderIsOpened: PropTypes.bool.isRequired,
};

export default CategoriesDropDownButtonSwitcher;
