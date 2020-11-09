import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { showPriceWithCurrency } from './services/getProductPrice';
import styles from './Styles.module.scss';

const SlideItem = ({ productArr }) => {
  const renderProduct = (product) => {
    const { id, name, images, price, categories, slug } = product;

    const imageObject = (images.length > 0 || images.length) && images[0];
    const img = imageObject ? images[0] : 'No photo';
    const subCategory =
      (categories.length > 0 || categories.length) && categories[0];
    const categoryName = subCategory ? categories[0].name : '';
    const currencyPrice = showPriceWithCurrency(price);
    return (
      <div key={id} className='col-xs-12 col-sm-6 col-md-4 col-lg-3'>
        <div className={styles.innerProductWrapper}>
          <Link to={`/product/${slug}`} className={styles.productsBody}>
            <div className={styles.imgWrapper}>
              <img src={img.src} alt={img.alt} />
            </div>
          </Link>
          <header className={styles.productHeader}>
            <h3 className={styles.productTitle}>{name}</h3>
            <h4 className={styles.subCatTitle}>{categoryName}</h4>
          </header>
          <div className={styles.priceWrapper}>
            <span className={styles.productPrice}>{currencyPrice}</span>
          </div>
          <div className='button-center-position'>
            <Link
              to={`/product/${slug}`}
              className='ctaButtonBorder smallButton'
            >
              <span className='button-text text-orange'>View product</span>
            </Link>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className={cx('latestProdSlide', styles.latestSingleSlide)}>
      {productArr.map(renderProduct)}
    </div>
  );
};

SlideItem.propTypes = {
  productArr: PropTypes.array.isRequired,
};

export default SlideItem;
