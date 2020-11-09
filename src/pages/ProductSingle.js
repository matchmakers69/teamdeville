import React, { useEffect, useRef, useState } from 'react';

import BreadcrumbHeader from '../components/woocommerce/singleProduct/BreadcrumbHeader';
import Loader from '../components/common/Loader';
import ProductDetailsColumn from '../components/woocommerce/singleProduct/ProductDetailsColumn';
import ProductImage from '../components/woocommerce/singleProduct/ProductImage';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import SingleProductHeader from '../components/woocommerce/singleProduct/SingleProductHeader';
import { TweenMax } from 'gsap';
import _isEmpty from 'lodash/isEmpty';
import { addToCart as addToCartActions } from '../actions/actionsPurchasedProducts';
import { addToFavourites as addToFavouritesActions } from '../actions/actionsSelectedProducts';
import { connect } from 'react-redux';
import constants from '../constants';
import { convertPriceToStringWithCurrencySign } from '../utils/functions/getPriceFormat';
import { fetchSingleProduct as fetchSingleProductActions } from '../actions/actionsWoo';
import { serverErrorAlert as serverErrorAlertActions } from '../actions/actionsError';
import { showPopup as showPopupActions } from '../actions/actionsPopUpInfo';
import { useToasts } from 'react-toast-notifications';

const ProductSingle = ({
  match: { params },
  singleProduct,
  fetchSingleProduct,
  showPopup,
  addToFavourites,
  addToCart,
  disabled,
  disabledButtons,
  serverErrorAlert,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const componentIsMounted = useRef(true);
  const { addToast } = useToasts();
  const [hasError, setHasError] = useState(false);
  const singleImageRef = useRef(null);
  const productSingleColumnRef = useRef(null);
  const {
    ADDED_TO_SHOPPINGLIST_ALERT,
    ADDED_TO_SHOPPINGLIST_DESC,
    ADDED_TO_SAVED_ALERT,
    ADDED_TO_SAVED_DESCRIPTION,
  } = constants;

  useEffect(() => {
    setIsLoading(true);
    const getSingleProduct = async () => {
      const { slug } = params;
      try {
        await fetchSingleProduct(slug); // Await before if statement dur to redux action returns dispatch, prevent memory leaking
        if (componentIsMounted.current) {
          setIsLoading(false);
          TweenMax.from(singleImageRef.current, 1.5, {
            autoAlpha: 0,
            delay: 0.5,
          });

          TweenMax.from(productSingleColumnRef.current, 0.5, {
            autoAlpha: 0,
            x: 40,
          });
        }
      } catch (error) {
        setHasError(true);
        setIsLoading(false);
        addToast('Something went wrong!', { appearance: 'error' });
        serverErrorAlert();
      }
    };
    getSingleProduct();
    return () => {
      componentIsMounted.current = false;
    };
  }, [addToast, fetchSingleProduct, params, serverErrorAlert]);

  const handleAddToFavourites = (productId) => {
    addToFavourites(productId);
    handleViemMoreFavourites();
  };

  const handleAddToCart = (productId) => {
    addToCart(productId);
    handleViemMoreBasket();
  };

  const handleViemMoreBasket = () => {
    showPopup({
      title: ADDED_TO_SHOPPINGLIST_ALERT,
      description: ADDED_TO_SHOPPINGLIST_DESC,
    });
  };

  const handleViemMoreFavourites = () => {
    showPopup({
      title: ADDED_TO_SAVED_ALERT,
      description: ADDED_TO_SAVED_DESCRIPTION,
    });
  };

  const {
    name,
    regular_price,
    images,
    categories,
    description,
    stock_status,
  } = singleProduct;

  const productDescription = !_isEmpty(description)
    ? description
    : 'Product does not have any description';
  const stockStatus = !_isEmpty(stock_status)
    ? stock_status
    : 'Please call for details';
  const formattedPrice = convertPriceToStringWithCurrencySign(regular_price);
  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (hasError) {
    return <Redirect to='/page-error' />;
  }
  return (
    <section className='section top__indent-large'>
      {!_isEmpty(singleProduct) && !isLoading ? (
        <>
          <SingleProductHeader />
          <BreadcrumbHeader title={name} categories={categories} />
          <div className='container fluid'>
            <div className='row'>
              <div ref={singleImageRef} className='col-xs-12 col-md-6 col-lg-5'>
                <ProductImage images={images} />
              </div>
              <div
                ref={productSingleColumnRef}
                className='col-xs-12 col-md-6 col-lg-7'
              >
                <ProductDetailsColumn
                  product={singleProduct}
                  price={formattedPrice}
                  productDescription={productDescription}
                  stockStatus={stockStatus}
                  handleAddToFavourites={handleAddToFavourites}
                  handleAddToCart={handleAddToCart}
                  disabled={disabled}
                  disabledButtons={disabledButtons}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className='col-xs-12'>
          <h3 className='titleNotFound'>
            Sorry...We could not find anything. <br /> However fetching data may
            take some time
          </h3>
        </div>
      )}
    </section>
  );
};

ProductSingle.propTypes = {
  showPopup: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  addToFavourites: PropTypes.func.isRequired,
  disabled: PropTypes.array.isRequired,
  singleProduct: PropTypes.object,
  disabledButtons: PropTypes.array.isRequired,
  serverErrorAlert: PropTypes.func.isRequired,
};

ProductSingle.defaultProps = {
  disabled: [],
  singleProduct: {},
};

const mapStateToProps = (state) => ({
  singleProduct: state.wooState.singleProduct,
  disabled: state.selectedProductsState.disabled,
  disabledButtons: state.cartState.disabledButtons,
});

const mapDispatchToProps = (dispatch) => ({
  fetchSingleProduct: (slug) => dispatch(fetchSingleProductActions(slug)),
  addToFavourites: (productId) => dispatch(addToFavouritesActions(productId)),
  addToCart: (productId) => dispatch(addToCartActions(productId)),
  showPopup: (config) => dispatch(showPopupActions(config)),
  serverErrorAlert: () => dispatch(serverErrorAlertActions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductSingle);
