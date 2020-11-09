import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Loader from '../../Loader';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import RegistrationContainer from '../RegistrationContainer';

const middlewares = [thunk];

describe('<RegistrationContainer/>', () => {
  let store = {};
  let initialState = {};

  beforeEach(() => {
    store = configureStore(middlewares);
    initialState = {
      wooState: {
        products: [],
        page: 1,
        categories: [],
        singleProduct: {},
        singleCategory: {},
        productsFromSingleCategory: [],
        error: null,
        isConfirmationModalOpened: false,
        shippingDetails: null,
        modalTitle: '',
        modalDescription: '',
      },
    };
  });

  it('should show <Loader /> while loading data', () => {
    let container;
    const mockStore = store(initialState);
    container = mount(
      <BrowserRouter>
        <Provider store={mockStore}>
          <RegistrationContainer />
        </Provider>
      </BrowserRouter>
    );
    expect(container.find(Loader)).toHaveLength(1);
  });
});
