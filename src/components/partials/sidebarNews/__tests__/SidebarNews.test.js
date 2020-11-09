import * as closeNewsSidebarActions from '../../../../stores/news/actions';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import React from 'react';
import SidebarNews from '../SidebarNews';
import { ToastProvider } from 'react-toast-notifications';
import { act } from 'react-dom/test-utils';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { GET_POSTS } from '../../../../utils/graphql/queries';
import { findByTestAttr } from '../../../../../tests/testUtils';

const mockStore = configureMockStore();

const initialStore = mockStore({
  newsState: {
    isLoading: false,
  },
});

const mockClient = createMockClient();

const apolloMocks = [
  {
    request: {
      query: GET_POSTS,
    },
    result: {
      data: {
        posts: {
          nodes: [
            {
              id: 'cG9zdDo0OTc3',
              databaseId: 4977,
              title: 'Covid-19 Update',
              slug: 'covid-19-update',
              date: '2020-04-28T09:43:19',
              content:
                '\n<p>These are strange, unprecedented times for the whole world and we hope that things ease up soon. We sincerely wish everyone to be safe and keep healthy.</p>\n\n\n\n<p>In the meantime, we are keeping on working and fulfilling orders &#8211; sometimes a bit slower than we would ideally like.  Stocks and suppliers have, generally, been very good but some items are getting hard to source. As an example, our supply of Lotus &#8216;short&#8217; steering arms has all but dried up. Our last pair went to the U.S.A. a few weeks back.  We are actively seeking new stocks as a matter of urgency.</p>\n\n\n\n<p>On a more upbeat note, we have had some great conversations and emails with customers and clients. It has been good to hear the renewed enthusiasm some people have had for their cars in this lockdown. We&#8217;ve heard of Anglia, Cortinas and even Lotus 7&#8217;s and Elans being resurrected after prolonged slumbers &#8211; don&#8217;t let up now you&#8217;ve started! </p>\n\n\n\n<p>All the very best, Paul &amp; Sarah @ TeamDeville</p>\n\n\n\n<p></p>\n',
              author: {
                name: 'teamDevilleAdmin',
              },
            },
            {
              id: 'cG9zdDo0NTU2',
              databaseId: 4556,
              title: 'Welcome to new website',
              slug: 'welcome-to-new-website',
              date: '2019-10-15T22:15:03',
              content:
                '\nWelcome to the launch of the new and improved Teamdeville website. Here you will find the latest information on our products as well as the website itself. We hope you like our new look which is designed to make it easier to find the information that you are looking for. We will be updating this Blog on a regular basis to keep you in touch with all the new things happening at Teamdeville.\n\n\n\n<p></p>\n',
              author: {
                name: 'teamDevilleAdmin',
              },
            },
          ],
        },
      },
    },
  },
];

const mountComponent = (store) =>
  mount(
    <ApolloProvider client={mockClient}>
      <Provider store={store}>
        <BrowserRouter>
          <ToastProvider>
            <MockedProvider mocks={apolloMocks} addTypename={false}>
              <SidebarNews />
            </MockedProvider>
          </ToastProvider>
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  );

describe('<SidebarNews />', () => {
  it('renders SidebarNews component without crash', async () => {
    const wrapper = mountComponent(initialStore);
    await act(async () => {
      wrapper;
    });

    await act(async () => {
      wrapper;
    });
    wrapper.update();

    const component = findByTestAttr(wrapper, 'sidebar-panel');

    expect(component.length).toBe(1);

    const loader = findByTestAttr(wrapper, 'loading-alert');
    expect(loader.length).toBe(0);
  });

  it('should fire closeNewsSidebar function when button is clicked', async () => {
    const wrapper = mountComponent(initialStore);

    let store = null;
    store = mockStore(initialStore);
    store.dispatch = jest.fn();

    await act(async () => {
      wrapper;
    });
    wrapper.update();

    const spyAction = jest.spyOn(closeNewsSidebarActions, 'closeNewsSidebar');
    const button = wrapper.find('[data-test="toggle-button"]');
    expect(button.length).toEqual(1);

    button.simulate('click');
    expect(spyAction).toHaveBeenCalledTimes(1);
  });
});
