import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import Search from '../Search';
import { act } from 'react-dom/test-utils';
import configureMockStore from 'redux-mock-store';
import { findByTestAttr } from '../../../tests/testUtils';
import { mount } from 'enzyme';
import { searchOperations } from '../../stores/search';

const mockStore = configureMockStore();

const initialStore = mockStore({
  searchState: {
    searchPanelOpened: false,
    allProductsFoundSearchPage: [],
    productsSearchQuery: '',
    isSearchQueryValid: false,
    isLoading: true,
    query: '',
    isSearchQuickFormValid: false,
    loadingSearch: false,
    pageNumber: 1,
    loadDropDownList: false,
    dropDownListProducts: [],
    listDropIsOpened: false,
    loadingDropDown: false,
    error: '',
  },
});

const mountComponent = (store) =>
  mount(
    <BrowserRouter>
      <Provider store={store}>
        <Search />
      </Provider>
    </BrowserRouter>
  );

describe('Search', () => {
  let store = {};
  let initialState = {};

  beforeEach(() => {
    store = configureMockStore();

    initialState = {
      searchPanelOpened: false,
      allProductsFoundSearchPage: [],
      productsSearchQuery: '',
      isSearchQueryValid: false,
      isLoading: true,
      query: '',
      isSearchQuickFormValid: false,
      loadingSearch: false,
      pageNumber: 1,
      loadDropDownList: false,
      dropDownListProducts: [],
      listDropIsOpened: false,
      loadingDropDown: false,
      error: '',
    };
  });

  it('renders Search component without crash', async () => {
    const container = mountComponent(initialStore);
    await act(async () => {
      container;
    });

    expect(container.length).toBe(1);
  });

  it('should show <Loader /> while loading data', async () => {
    const container = mountComponent(initialStore);
    await act(async () => {
      container;
    });
    const spinner = findByTestAttr(container, 'search-loader');
    expect(spinner.length).toBe(1);
  });

  it('should run function fetchFoundProductsByParameter', () => {
    initialState = {
      allProductsFoundSearchPage: [],
    };

    const mockStore = store(initialState);
    const wrapper = mount(
      <BrowserRouter>
        <Provider store={mockStore}>
          <Search />
        </Provider>
      </BrowserRouter>
    );

    expect(
      wrapper
        .find('Provider')
        .prop('store')
        .getActions()
    ).toEqual([searchOperations.fetchFoundProductsByParameter()]);
  });
});
