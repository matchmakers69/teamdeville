import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import Loader from '../components/common/Loader';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { SavedProductSingle } from './cartPage/savedProducts';
import {
  deleteFavoriteProduct as deleteFavoriteProductActions,
  addSavedItemToShoppingList as addSavedItemToShoppingListActions,
} from '../actions/actionsSelectedProducts';
import { openModalInfo as openModalInfoActions } from '../actions/actionsPopUpInfo';
import constants from '../constants';

const Favourites = ({
  favourites,
  deleteFavoriteProduct,
  addSavedItemToShoppingList,
  openModalInfo,
}) => {
  const { MODAL_TITLE_INFO, MODAL_INFO_DESCRIPTION } = constants;

  const componentIsMounted = useRef(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (componentIsMounted.current) {
      setIsLoading(false);
    }

    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  const handleRemove = (productId) => {
    deleteFavoriteProduct(productId);
  };

  const handleDisplayModalInfo = () => {
    openModalInfo({
      modalAlertHeader: MODAL_TITLE_INFO,
      modalAlert: MODAL_INFO_DESCRIPTION,
    });
  };

  const handleAddToShoppingList = (productId) => {
    addSavedItemToShoppingList(productId);
    handleDisplayModalInfo();
  };

  return (
    <Loader isLoading={isLoading}>
      <section
        data-section='primary'
        className={cx('section', 'top__indent-large')}
      >
        <div className={cx('container', 'fluid')}>
          <div className={cx('row')}>
            <div className={cx('col-xs-12')}>
              <header className='sectionHeader'>
                <h2 className='sectionTitle'>Saved items</h2>
              </header>
            </div>
          </div>
        </div>
        <div className={cx('container', 'fluid')}>
          <div className={cx('row')}>
            {!isEmpty(favourites) ? (
              favourites.map((product) => (
                <SavedProductSingle
                  key={product.id}
                  product={product}
                  handleRemove={handleRemove}
                  handleAddToShoppingList={handleAddToShoppingList}
                />
              ))
            ) : (
              <div className='col-xs-12'>
                <h3 className='titleNotFound'>
                  Sorry... you do not have any products here.
                </h3>
              </div>
            )}
          </div>
        </div>
      </section>
    </Loader>
  );
};

const mapStateToProps = (state) => ({
  favourites: state.selectedProductsState.favourites,
});

const mapDispatchToProps = (dispatch) => ({
  deleteFavoriteProduct: (productId) =>
    dispatch(deleteFavoriteProductActions(productId)),
  addSavedItemToShoppingList: (productId) =>
    dispatch(addSavedItemToShoppingListActions(productId)),
  openModalInfo: (config) => dispatch(openModalInfoActions(config)),
});

Favourites.propTypes = {
  favourites: PropTypes.instanceOf(Array).isRequired,
  deleteFavoriteProduct: PropTypes.func.isRequired,
  addSavedItemToShoppingList: PropTypes.func.isRequired,
  openModalInfo: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
