import { Provider } from 'react-redux';
import React from 'react';
import StaticMenu from '../StaticMenu';
import { act } from 'react-dom/test-utils';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { findByTestAttr } from '../../../../../tests/testUtils';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { MockedProvider } from '@apollo/react-testing';
import { MENU_QUERY } from '../../../../utils/graphql/queries';
import * as newsActions from '../../../../stores/news/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialStore = mockStore({
  newsState: {
    news: [],
    sidebarOpen: false,
  },
});

const mockClient = createMockClient();

const apolloMocks = [
  {
    request: {
      query: MENU_QUERY,
      variables: { id: 'bmF2X21lbnU6MTYy' },
    },
    result: {
      data: {
        menu: {
          id: 'bmF2X21lbnU6MTYy',
          slug: 'main-menu',
          menuItems: {
            nodes: [
              {
                id: 'bmF2X21lbnVfaXRlbTo0MTk5',
                url: 'http://teamdeville.co.uk/',
                label: 'Home',
              },
              {
                id: 'bmF2X21lbnVfaXRlbTo0NTI0',
                url: 'http://teamdeville.co.uk/gallery/',
                label: 'Gallery',
              },
              {
                id: 'bmF2X21lbnVfaXRlbTo0NTI2',
                url: 'http://teamdeville.co.uk/contact/',
                label: 'Contact',
              },
              {
                id: 'bmF2X21lbnVfaXRlbTo0NTcz',
                url: 'http://teamdeville.co.uk/all-products/',
                label: 'Products',
              },
            ],
          },
        },
      },
    },
  },
];

const mountComponent = (store) =>
  mount(
    <ApolloProvider client={mockClient}>
      <Provider store={store}>
        <MockedProvider mocks={apolloMocks} addTypename={false}>
          <StaticMenu />
        </MockedProvider>
      </Provider>
    </ApolloProvider>
  );

describe('<StaticMenu />', () => {
  it('renders StaticMenu component without crash', async () => {
    const wrapper = mountComponent(initialStore);
    await act(async () => {
      wrapper;
    });

    await act(async () => {
      wrapper;
    });
    wrapper.update();
    const component = findByTestAttr(wrapper, 'static-menu');

    expect(component.length).toBe(1);

    const loader = findByTestAttr(wrapper, 'loading-alert');
    expect(loader.length).toBe(0);
  });

  it('check if button news exists and fires function on click', async () => {
    let store = null;
    store = mockStore(initialStore);
    store.dispatch = jest.fn();
    const spyAction = jest
      .spyOn(newsActions, 'openNewsSidebar')
      .mockImplementation(() => ({ type: '' })); // mock function openNewsSidebar
    const wrapper = mountComponent(initialStore);
    await act(async () => {
      wrapper;
    });
    wrapper.update();
    const button = findByTestAttr(wrapper, 'newsSwitcher');
    expect(button.length).toBe(1);
    button.simulate('click');
    expect(spyAction).toHaveBeenCalledTimes(1);
  });
});
