import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../LoginPage';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { findByTestAttr } from '../../../tests/testUtils';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';

describe('<LoginPage />', () => {
  let store = {};
  let initialState = {};
  let wrapper;
  const mockClient = createMockClient();
  beforeEach(() => {
    store = configureStore();
    store.dispatch = jest.fn();

    initialState = {
      authState: {
        loggedIn: false,
      },
    };
  });

  it('LoginPage renders without crash', () => {
    initialState = {
      authState: {
        loggedIn: true,
      },
    };
    const mockStore = store(initialState);
    wrapper = mount(
      <ApolloProvider client={mockClient}>
        <Provider store={mockStore}>
          <BrowserRouter>
            <LoginPage />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    );

    const component = findByTestAttr(wrapper, 'LoginForm');
    expect(component.length).toBe(1);
  });
});
