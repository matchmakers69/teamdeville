import React from 'react';
import { Link } from 'react-router-dom';
import ButtonRemove from '../../../components/common/buttons/ButtonRemove';
import PropTypes from 'prop-types';
import styles from './Styles.module.scss';
import { convertPriceToStringWithCurrencySign } from '../../../utils/functions/getPriceFormat';

const SavedProductSingle = ({
  product,
  handleRemove,
  handleAddToShoppingList,
}) => {
  const { id, name, images, price, categories, slug } = product;

  const imageObject = images.length > 0 && images[0];
  const img = imageObject ? images[0] : 'No photo will be displayed';
  const subCategory = categories.length > 0 && categories[0];
  const categoryName = subCategory ? categories[0].name : '';
  const priceWithCurrencySign = convertPriceToStringWithCurrencySign(price);

  return (
    <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3 bottom-margin-col'>
      <div className='innerProductWrapper'>
        <Link to={`product/${slug}`} className='productsBody'>
          <div className='imgWrapper'>
            <img src={img.src} alt={img.alt} />
          </div>
        </Link>
        <header className='productHeader'>
          <h3 className='productTitle'>{name}</h3>
          <h4 className='subCatTitle'>{categoryName}</h4>
        </header>
        <div className='priceWrapper'>
          <span className='productPrice'>{priceWithCurrencySign}</span>
        </div>
        <div className='button-space-position'>
          <Link
            to={`/product/${slug}`}
            className='ctaButtonBorder smallButton greyBorder'
          >
            <span className='button-text text-orange'>View product</span>
          </Link>
          <div className={styles.buttonAddToShoppingListWrapper}>
            <button
              type='button'
              className='button-center-position ctaButtonLarge bckGrey'
              onClick={() => handleAddToShoppingList(product.id)}
            >
              <span className='button-text'>Add to shopping list</span>
            </button>
          </div>
          <ButtonRemove
            text='Remove'
            type='button'
            handleRemove={handleRemove}
            param={id}
          />
        </div>
      </div>
    </div>
  );
};

SavedProductSingle.propTypes = {
  handleRemove: PropTypes.func.isRequired,
  handleAddToShoppingList: PropTypes.func.isRequired,
  product: PropTypes.object,
};

SavedProductSingle.defaultProps = {
  product: {},
};

export default SavedProductSingle;
