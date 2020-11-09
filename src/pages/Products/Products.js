import React, { Component } from 'react';
import {
  getAllProductsWithPageQuery,
  getCategoriesForProductPage,
} from '../../utils/woocommerce';

import Loader from '../../components/common/Loader';
import Pagination from '../../components/woocommerce/Pagination';
import Product from '../../components/woocommerce/Product';
import ProductFilters from '../../components/productFilters/ProductFilters';
import { Redirect } from 'react-router-dom';
import _isEmpty from 'lodash/isEmpty';
import _isNull from 'lodash/isNull';
import { connect } from 'react-redux';
import { getFilteredProducts } from '../services/filterProducts';
import { getProductCateroryNames } from '../services/categoryNames';
import { serverErrorAlert } from '../../actions/actionsError';
import withToast from '../../HOC/withToaster';

class Products extends Component {
  _isMounted = false;

  state = {
    page: 1,
    hasError: false,
    startNewSearch: false,
    productsPerPage: [],
    categories: [],
    isLoading: true,
    prevY: 0,
    loaderRef: null,
    filters: {
      searchQuery: '',
      sortPrice: '',
      sortPrices: ['Lowest price', 'Highest price'],
      categoryName: '',
      priceFrom: '',
    },
  };

  handlePageFromQueryParams = () => {
    const { page } = this.state;
    const pageFromStarage = JSON.parse(localStorage.getItem('pageNumber'));
    const pageParam = _isNull(pageFromStarage) ? page : pageFromStarage;
    this.getAllProducts(pageParam);
    if (!Number.isNaN(Number(pageParam))) {
      this.getAllProducts(pageParam);
      this.setState({
        page: pageParam,
      });
    } else {
      this.getAllProducts(page);
    }
  };
  componentDidMount() {
    this._isMounted = true;
    this.handlePageFromQueryParams();
  }
  componentWillUnmount = () => {
    this._isMounted = false;
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

  getAllProducts = async (page) => {
    const pageNumberQuery = `page=${page}`;
    this.setState({ isLoading: true });
    try {
      const [products, categories] = await Promise.all([
        getAllProductsWithPageQuery(pageNumberQuery),
        getCategoriesForProductPage(),
      ]);

      if (this._isMounted) {
        this.setState({
          productsPerPage: products,
          categories,
          isLoading: false,
        });
      }
    } catch (error) {
      this.setState({
        hasError: true,
        isLoading: false,
      });
      this.props.addToast('You can not display products!', {
        appearance: 'error',
      });
      this.props.dispatch(serverErrorAlert());
    }
  };

  handlePaginationClick = (direction) => {
    this._isMounted = true;
    const { page } = this.state;
    let nextPage = Number(page);
    nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1;
    localStorage.setItem('pageNumber', nextPage);

    if (this._isMounted) {
      this.setState(
        {
          page: nextPage,
          isLoading: true,
        },
        () => {
          if (this._isMounted) {
            this.getAllProducts(nextPage);
          }
        }
      );
    }
  };

  handleLoadProducts = () => {
    localStorage.removeItem('pageNumber');
    let pageReset = 1;
    if (this._isMounted) {
      this.setState(
        {
          page: pageReset,
          isLoading: true,
        },
        () => {
          if (this._isMounted) {
            this.getAllProducts(pageReset);
          }
        }
      );
    }
  };

  render() {
    const {
      page,
      filters,
      productsPerPage,
      categories,
      isLoading,
      hasError,
    } = this.state;
    const allProducts = getFilteredProducts(productsPerPage, filters) || [];
    const categoryNamesAsString = getProductCateroryNames(categories);

    if (hasError) {
      return <Redirect to='/page-error' />;
    }

    return (
      <Loader isLoading={isLoading}>
        <section data-section='primary' className='section top__indent-large'>
          <div className='container fluid full'>
            <div className='row'>
              <div className='col-xs-12'>
                <header className='sectionHeader'>
                  <h2 className='sectionTitle'>All Products</h2>
                </header>
              </div>
            </div>
          </div>
          <div className='container fluid full'>
            <div className='row'>
              <div className='col-xs-12 bottom-margin-col'>
                <Pagination
                  page={page}
                  productsPerPage={productsPerPage}
                  handlePaginationClick={this.handlePaginationClick}
                />
              </div>
              <div className='col-xs-12'>
                <ProductFilters
                  handleFiltersChange={this.handleFiltersChange}
                  filters={filters}
                  categories={categoryNamesAsString}
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
            {_isEmpty(allProducts) && (
              <button
                onClick={() => this.handleLoadProducts()}
                className='buttonSubmit'
              >
                Load again
              </button>
            )}
          </div>
        </section>
      </Loader>
    );
  }
}
export default withToast(connect()(Products));
