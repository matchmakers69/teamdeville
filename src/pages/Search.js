import React, { useEffect } from 'react';
import {
  fetchFoundProductsByParameter,
  fetchProductsByQueryRequest as fetchProductsByQueryRequestActions,
  fetchProductsClickMore as fetchProductsClickMoreActions,
  inputQuickSearchChange as inputQuickSearchChangeActions,
  resetSearchResult as resetSearchResultActions,
  startSearchProducts as startSearchProductsActions,
} from '../stores/search/actions';

import DropDownSearch from '../components/searchProducts/DropDownSearch/DropDownSearch';
import InputQuickSearch from '../components/searchProducts/InputQuickSearch';
import Loader from '../components/common/Loader';
import Product from '../components/woocommerce/Product';
import PropTypes from 'prop-types';
import SmallSpinner from '../components/common/Loader/SmallSpinner';
import _debounce from 'lodash/debounce';
import { connect } from 'react-redux';
import cx from 'classnames';
import { withRouter } from 'react-router-dom';

const Search = ({
  fetchFoundProductsByParameter,
  allProductsFoundSearchPage,
  isLoading,
  inputQuickSearchChange,
  query,
  fetchProductsByQueryRequest,
  startSearchProducts,
  resetSearchResult,
  loadingSearch,
  loadDropDownList,
  listDropIsOpened,
  fetchProductsClickMore,
  dropDownListProducts,
  loadingDropDown,
  error,
  isSearchQuickFormValid,
}) => {
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchFoundProductsByParameter();
    }
    return () => {
      mounted = false;
    };
  }, [fetchFoundProductsByParameter]);

  const startSearchingDebounce = () => {
    fetchProductsByQueryRequest();
  };

  const handleInputDebounced = _debounce(startSearchingDebounce, 400);

  const handleQuickSearchInputChange = (e) => {
    const { value } = e.target;
    inputQuickSearchChange(value);
    if (value.length > 3) {
      startSearchProducts();
      handleInputDebounced();
    } else {
      resetSearchResult();
    }
  };

  const handleMoreSearchPages = () => {
    fetchProductsClickMore();
  };

  return (
    <Loader data-test='search-loader' isLoading={isLoading}>
      {!isLoading && (
        <section
          data-test='search-section'
          data-section='primary'
          className='section top__indent-large'
        >
          <div className='container fluid full'>
            <div className='row'>
              <div className='col-xs-12'>
                <header className='sectionHeader'>
                  <h2 className='sectionTitle'>Search results</h2>
                </header>
              </div>
            </div>
            <div className={cx('row')}>
              <div className='col-xs-12 wrapper-relative'>
                <InputQuickSearch
                  query={query}
                  loadDropDownList={loadDropDownList}
                  handleQuickSearchInputChange={handleQuickSearchInputChange}
                  loadingDropDown={loadingDropDown}
                />
                {listDropIsOpened && dropDownListProducts.length > 0 && (
                  <DropDownSearch dropDownListProducts={dropDownListProducts} />
                )}
                {isSearchQuickFormValid && error.length !== '' && (
                  <p>{error}</p>
                )}
              </div>
            </div>

            {loadingSearch ? (
              <SmallSpinner />
            ) : (
              <div className='row'>
                {allProductsFoundSearchPage.length >= 100 && (
                  <div className='col-xs-12 '>
                    <div className='loadMoreWrapper'>
                      <button
                        className='loadMoreProductsBtn'
                        onClick={() => handleMoreSearchPages()}
                      >
                        <span className='loadMoreText'>Load more products</span>
                      </button>
                    </div>
                  </div>
                )}
                {allProductsFoundSearchPage.length > 0 ? (
                  allProductsFoundSearchPage.map((product) => (
                    <Product key={product.id} product={product} />
                  ))
                ) : (
                  <div className='col-xs-12'>
                    <h3 className='titleNotFound'>
                      Sorry...We could not find anything. <br /> However
                      fetching data may take some time
                    </h3>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </Loader>
  );
};

Search.propTypes = {
  fetchFoundProductsByParameter: PropTypes.func.isRequired,
  allProductsFoundSearchPage: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

Search.defaultProps = {
  allProductsFoundSearchPage: [],
  isLoading: false,
};

const mapStateToProps = (state) => ({
  ...state.searchState,
});

const mapDisToProps = (dispatch) => ({
  fetchFoundProductsByParameter: () =>
    dispatch(fetchFoundProductsByParameter()),
  startSearchProducts: () => dispatch(startSearchProductsActions()),
  inputQuickSearchChange: (value) =>
    dispatch(inputQuickSearchChangeActions(value)),
  fetchProductsByQueryRequest: () =>
    dispatch(fetchProductsByQueryRequestActions()),
  resetSearchResult: () => dispatch(resetSearchResultActions()),
  fetchProductsClickMore: () => dispatch(fetchProductsClickMoreActions()),
});

export default withRouter(connect(mapStateToProps, mapDisToProps)(Search));
