import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';
import { Provider } from 'react-redux';
import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import { act } from 'react-dom/test-utils';
import * as closeSearchActions from '../../../stores/search/actions';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockClient = createMockClient();
const initialStore = mockStore({
  authState: {
    bodyFade: false,
    faderIsOpened: false,
  },
  searchState: {
    searchPanelOpened: true,
    productsSearchQuery: '',
    isSearchQueryValid: true,
  },
  selectedProductsState: {
    favourites: [],
  },
  cartState: {
    purchasedProducts: [],
  },
  newsState: {
    news: [],
  },
});

const mountComponent = (store) =>
  mount(
    <ApolloProvider client={mockClient}>
      <Provider store={store}>
        <BrowserRouter>
          <ToastProvider>
            <Header />
          </ToastProvider>
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  );

describe('<Header/>', () => {
  it('renders Header component with no crushing', async () => {
    const wrapper = mountComponent(initialStore);
    await act(async () => {
      wrapper;
    });
    expect(wrapper.length).toBe(1);
  });

  it('render main logo in header', async () => {
    const wrapper = mountComponent(initialStore);
    await act(async () => {
      wrapper;
    });

    const logo = wrapper.find('[data-test="mainLogo"]');
    expect(logo.length).toEqual(1);
  });

  it('check if button runs function', async () => {
    const wrapper = mountComponent(initialStore);

    let store = null;
    store = mockStore(initialStore);
    store.dispatch = jest.fn();
    await act(async () => {
      wrapper;
    });

    const spyAction = jest.spyOn(closeSearchActions, 'closeSearchPanelClick');

    const button = wrapper.find('[data-test="button-testing-switch"]');
    expect(button.length).toEqual(1);
    button.simulate('click');
    expect(spyAction).toHaveBeenCalledTimes(1);
  });
});
