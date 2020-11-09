import React from 'react';
import { Link } from 'react-router-dom';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import Img from 'react-image';
import SmallSpinner from '../common/Loader/SmallSpinner';
import styles from './Styles.module.scss';
import { convertPriceToStringWithCurrencySign } from '../../utils/functions/getPriceFormat';

const Product = ({
  product: { name, images, price, categories, slug, stock_quantity },
}) => {
  const stockQuantity = stock_quantity === null ? 1 : stock_quantity;

  const imageObj = images.length > 0 ? images[0] : null;
  const src = !_isEmpty(imageObj) && imageObj.src;
  const alt = !_isEmpty(imageObj) ? imageObj.alt : "Product's image";
  const imagePosterSrc =
    'https://dummyimage.com/600x400/555/fff.jpg&text=Photo+coming+soon!';

  const subCategory = categories.length > 0 && categories[0];
  const categoryName = subCategory ? categories[0].name : '';

  const priceWithCurrencySign = convertPriceToStringWithCurrencySign(price);

  return (
    <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3 bottom-margin-col'>
      <div className={styles.innerProductWrapper}>
        <Link to={`../product/${slug}`} className={styles.productsBody}>
          <div className={styles.imgWrapper}>
            <Img
              loader={<SmallSpinner />}
              unloader={<img alt={alt} src={imagePosterSrc} />}
              src={src}
              alt={alt}
            />
          </div>
        </Link>
        <header className={styles.productHeader}>
          <h3 className={styles.productTitle}>{name}</h3>
          <h4 className={styles.subCatTitle}>{categoryName}</h4>
          <span className='stockAmount'>Total stock: {stockQuantity}</span>
        </header>
        <div className={styles.priceWrapper}>
          <span className={styles.productPrice}>{priceWithCurrencySign}</span>
        </div>
        <div className='button-center-position'>
          <Link
            to={`../product/${slug}`}
            className='ctaButtonBorder smallButton greyBorder'
          >
            <span className='button-text text-orange'>View product</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    images: PropTypes.array,
    price: PropTypes.string,
    categories: PropTypes.array,
    slug: PropTypes.string,
    stock_quantity: PropTypes.number,
  }).isRequired,
};

export default Product;
