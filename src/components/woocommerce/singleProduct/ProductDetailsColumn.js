import React from 'react';
import cx from 'classnames';
import styles from './Styles.module.scss';
import SocialBox from '../../common/social/SocialBox';
import PropTypes from 'prop-types';

const ProductDetailsColumn = ({
  product,
  product: { id, name, permalink },
  price,
  productDescription,
  stockStatus,
  handleAddToFavourites,
  handleAddToCart,
  disabled,
  disabledButtons,
  favouriteAdded,
}) => {
  return (
    <div className={styles.productDetailsColumn}>
      <div className={styles.productTopSection}>
        <header className={styles.headerProducts}>
          <h1 className={styles.productMainTitle}>
            <span className={styles.titleText}>{name}</span>
          </h1>
        </header>
        <div className={styles.priceContainer}>
          <h3 className={styles.priceHeader}>
            <span className={styles.priceTitle}>Price: {price}</span>
          </h3>
        </div>
      </div>
      <div className={styles.productBottomSection}>
        <div className={styles.detailsWrapper}>
          <div className={styles.colLeft}>
            <span className={styles.detailsTitle}>Description:</span>
          </div>
          <div className={styles.colRight}>
            <p
              dangerouslySetInnerHTML={{ __html: productDescription }}
              className={styles.detailsText}
            />
          </div>
        </div>
        <div className={styles.detailsWrapper}>
          <div className={styles.colLeft}>
            <span className={styles.detailsTitle}>Stock status:</span>
          </div>
          <div className={styles.colRight}>
            <span className={cx(styles.quantityInfo, styles.stockColor)}>
              {stockStatus}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.singleProductsBurttonsWrapper}>
        <button
          type='button'
          disabled={disabled.indexOf(id) !== -1}
          className='button-center-position ctaButtonLarge bckOrange'
          onClick={() => handleAddToFavourites(product)}
        >
          <span className='button-text'>Add to saved items</span>
        </button>
        {favouriteAdded && (
          <span className={styles.isAdded}>
            Product was added to favourites
          </span>
        )}
        <button
          type='button'
          disabled={disabledButtons.indexOf(id) !== -1}
          className='button-center-position ctaButtonLarge bckGrey'
          onClick={() => handleAddToCart(product)}
        >
          <span className='button-text'>Add to shopping list</span>
        </button>
      </div>
      <SocialBox permalink={permalink} />
    </div>
  );
};

ProductDetailsColumn.propTypes = {
  handleAddToFavourites: PropTypes.func.isRequired,
};

export default ProductDetailsColumn;
