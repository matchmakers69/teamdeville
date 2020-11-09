import React from 'react';
import cx from 'classnames';
import _isEmpty from 'lodash/isEmpty';
import styles from './Styles.module.scss';
import PropTypes from 'prop-types';
import { calculateTotalProductPrice } from './services/totalProductPrice';

const SingleProductInCart = ({
  product,
  id,
  name,
  images,
  stock_quantity,
  price,
  handleRemoveProductFromCart,
  handleQuantityIncrement,
  handleQuantityDecrement,
  handleInputQuantityChange,
}) => {
  const quantity = stock_quantity === null ? 1 : stock_quantity;

  const imageObject = images && images.length && !_isEmpty(images) && images[0];
  const img = imageObject ? images[0] : 'No photo';
  const total = calculateTotalProductPrice(price, stock_quantity);
  return (
    <div className={styles.productWrapper}>
      <div className={styles.productSummaryHeader}>
        <p className={styles.orderSummaryText}>ORDER SUMMARY</p>
      </div>
      <div className={styles.productWrapperInner}>
        <header className={styles.productHeader}>
          <div className={cx(styles.productCell, styles.productIcontitle)}>
            Product
          </div>
          <div className={cx(styles.productCell, styles.productName)}>
            Title
          </div>
          <div className={cx(styles.productCell, styles.productQuantity)}>
            Quantity
          </div>
          <div className={cx(styles.productCell, styles.productPrice)}>
            Price
          </div>
          <div className={cx(styles.productCell, styles.productRemove)} />
        </header>
        <section className={styles.productDetails}>
          <div className={cx(styles.productCell, styles.productIcontitle)}>
            <figure className={styles.productIcon}>
              <img src={img.src} alt={img.alt} />
            </figure>
          </div>
          <div className={cx(styles.productCell, styles.productName)}>
            <span className={cx(styles.productDesc)}>{name}</span>
          </div>
          <div className={cx(styles.productCell, styles.productQuantity)}>
            <div className={styles.quantityInputWrapper}>
              <button
                onClick={() => handleQuantityDecrement(product)}
                className={styles.buttonQuant}
                type='button'
              >
                <span>-</span>
              </button>
              <input
                placeholder='1'
                name='stock_quantity'
                onChange={(event) => handleInputQuantityChange(event, id)}
                type='text'
                value={quantity}
              />
              <button
                onClick={() => handleQuantityIncrement(product)}
                className={styles.buttonQuant}
                type='button'
              >
                <span>+</span>
              </button>
            </div>
          </div>
          <div className={cx(styles.productCell, styles.productPrice)}>
            <span className={cx(styles.productDesc, styles.priceDesc)}>
              {total}
            </span>
          </div>
          <div className={cx(styles.productCell, styles.productRemove)}>
            <button
              type='button'
              onClick={() => handleRemoveProductFromCart(id)}
              className={styles.removeBtn}
            >
              Remove
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

SingleProductInCart.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    images: PropTypes.array,
    // stock_quantity: PropTypes.number,
    price: PropTypes.string,
  }).isRequired,
  handleRemoveProductFromCart: PropTypes.func.isRequired,
  handleInputQuantityChange: PropTypes.func.isRequired,
  handleQuantityIncrement: PropTypes.func.isRequired,
};

export default SingleProductInCart;
