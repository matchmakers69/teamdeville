import React from 'react';
import PropTypes from 'prop-types';
import styles from './Styles.module.scss';
import constants from '../../constants';
import cx from 'classnames';
import { Link } from 'react-router-dom';

const { SAVED_ITEMS, SHOPPING_LIST } = constants;
const HeaderProductsButtons = ({ purchasedProducts = [], favourites = [] }) => (
  <div className={styles.callToActionWrapper}>
    <div className={styles.callToActionWrapperInner}>
      <button className={cx('button-cta', 'bckBlack', styles.topButtonCta)}>
        <Link className='button-text' to={SAVED_ITEMS}>
          <span className={styles.pageLinkText}>Saved items</span>
        </Link>
        <span className={styles.productsAmount}>
          {favourites.length > 0 ? favourites.length : 0}
        </span>
      </button>

      <button className={cx('button-cta', 'bckBlack', styles.topButtonCta)}>
        <Link className='button-text' to={SHOPPING_LIST}>
          <span className={styles.pageLinkText}>Shopping List</span>
        </Link>
        <span className={styles.productsAmount}>
          {purchasedProducts.length > 0 ? purchasedProducts.length : 0}
        </span>
      </button>
    </div>
  </div>
);

HeaderProductsButtons.propTypes = {
  purchasedProducts: PropTypes.array.isRequired,
  favourites: PropTypes.array.isRequired,
};

export default HeaderProductsButtons;
