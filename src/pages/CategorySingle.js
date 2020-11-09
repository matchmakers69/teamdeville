import React, { Component } from 'react';
import {
  fetchProductsFromSingleCategory as fetchProductsFromSingleCategoryActions,
  resetPageCounter as resetPageCounterActions,
  singleCategoryChangePageNumber as singleCategoryChangePageNumberActions,
} from '../actions/actionsWoo';

import Loader from '../components/common/Loader';
import Pagination from '../components/woocommerce/Pagination';
import Product from '../components/woocommerce/Product';
import ProductFilters from '../components/productFilters/ProductFilters';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFilteredProducts } from './services/filterProducts';
import { serverErrorAlert as serverErrorAlertActions } from '../actions/actionsError';
import withToast from '../HOC/withToaster';

class CategorySingle extends Component {
  _isMounted = false;

  state = {
    isLoading: true,
    hasError: false,
    placeholder: 'Search this section e.g Gearbox',
    filters: {
      searchQuery: '',
      sortPrice: '',
      sortPrices: ['Lowest price', 'Highest price'],
      categoryName: '',
      priceFrom: '',
    },
  };

  fetchProductsCategory = async (slug) => {
    this.setState({
      isLoading: true,
    });

    try {
      if (this._isMounted) {
        this.props.resetPageCounter();
        await this.props.fetchProductsFromSingleCategory(slug);
      }
      this.setState({
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        hasError: true,
        isLoading: false,
      });
      this.props.addToast('Something went wrong!', {
        appearance: 'error',
      });
      this.props.serverErrorAlert();
    }
  };

  handleCategoryUpdate = async (direction) => {
    this.setState({
      isLoading: true,
    });

    try {
      if (this._isMounted) {
        await this.props.singleCategoryChangePageNumber(direction);
      }
      this.setState({
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        hasError: true,
        isLoading: false,
      });
      this.props.addToast('Something went wrong!', {
        appearance: 'error',
      });
      this.props.serverErrorAlert();
    }
  };

  componentDidMount = () => {
    this._isMounted = true;
    const { slug } = this.props.match.params;
    this.fetchProductsCategory(slug);
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  componentDidUpdate = (prevProps) => {
    const { match } = this.props;
    const { slug } = match.params;
    const slug1 = slug;
    const slug2 = prevProps.match.params.slug;
    if (slug1 !== slug2) {
      this.fetchProductsCategory(slug);
    }
  };

  handleFiltersChange = (e) => {
    const { filters } = this.state;
    const target = e.target;
    const { name, value } = target;

    this.setState({
      filters: {
        ...filters,
        [name]: value,
      },
    });
  };

  handleResetFilters = () => {
    this.setState({
      filters: {
        searchQuery: '',
        sortPrices: ['Lowest price', 'Highest price'],
        categoryName: '',
        sortPrice: '',
        priceFrom: '',
      },
    });
  };

  handlePaginationClick = (direction) => {
    this.handleCategoryUpdate(direction);
  };

  render() {
    const { singleCategory, productsFromSingleCategory, page } = this.props;
    const { isLoading, filters } = this.state;

    const allProducts = getFilteredProducts(
      productsFromSingleCategory,
      filters
    );

    const categoryName = singleCategory
      ? singleCategory.name
      : "Product's category";

    if (isLoading) {
      return <Loader data-test='pageLoader' isLoading={isLoading} />;
    }

    if (this.state.hasError) {
      return <Redirect to='/page-error' />;
    }
    return (
      <section className='section top__indent-large'>
        <div className='container fluid full'>
          <div className='row'>
            <div className='col-xs-12'>
              <header className='sectionHeader'>
                <h2 className='sectionTitle'>{categoryName}</h2>
              </header>
            </div>
          </div>
        </div>

        <div className='container fluid full'>
          <div className='row'>
            <div className='col-xs-12 bottom-margin-col'>
              <Pagination
                page={page}
                productsPerPage={productsFromSingleCategory}
                handlePaginationClick={this.handlePaginationClick}
              />
            </div>
            <div className='col-xs-12'>
              <ProductFilters
                handleFiltersChange={this.handleFiltersChange}
                filters={filters}
                resetFilters={this.handleResetFilters}
              />
            </div>
          </div>
        </div>

        <div className='container fluid full'>
          <div className='row'>
            {allProducts.length > 0 ? (
              allProducts.map((product) => (
                <Product key={product.id} product={product} />
              ))
            ) : (
              <div className='col-xs-12'>
                <h3 className='titleNotFound'>
                  Sorry...We could not find anything. <br /> However fetching
                  data may take some time
                </h3>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  singleCategory: state.wooState.singleCategory,
  productsFromSingleCategory: state.wooState.productsFromSingleCategory,
  page: state.wooState.page,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProductsFromSingleCategory: (categorySlug) =>
    dispatch(fetchProductsFromSingleCategoryActions(categorySlug)),
  singleCategoryChangePageNumber: (direction) =>
    dispatch(singleCategoryChangePageNumberActions(direction)),
  resetPageCounter: () => dispatch(resetPageCounterActions()),
  serverErrorAlert: () => dispatch(serverErrorAlertActions()),
});

CategorySingle.propTypes = {
  fetchProductsFromSingleCategory: PropTypes.func.isRequired,
};

export default withToast(
  connect(mapStateToProps, mapDispatchToProps)(CategorySingle)
);
