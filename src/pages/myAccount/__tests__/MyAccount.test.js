import { BrowserRouter } from 'react-router-dom';
import MyAccount from '../MyAccount';
import { Provider } from 'react-redux';
import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import configureMockStore from 'redux-mock-store';
import { act } from 'react-dom/test-utils';
import { findByTestAttr } from '../../../../tests/testUtils';
import { mount } from 'enzyme';
import users from '../__fixtures__/users';
import { usersOperations } from '../../../stores/profile';
import * as logoutUserActions from '../../../stores/auth/actions';

const MOCKED_USERS_DATA = users;
const mockStore = configureMockStore();

const initialStore = mockStore({
  usersState: {
    users: MOCKED_USERS_DATA,
    customer: {},
    error: false,
    isLoading: false,
  },
});

const mountComponent = (store) =>
  mount(
    <BrowserRouter>
      <Provider store={store}>
        <ToastProvider>
          <MyAccount />
        </ToastProvider>
      </Provider>
    </BrowserRouter>
  );

describe('<MyAccount />', () => {
  let store = {};
  let initialState = {};

  beforeEach(() => {
    store = configureMockStore();

    initialState = {
      users: MOCKED_USERS_DATA,
      customer: {},
      error: false,
      isLoading: false,
    };
  });

  it('hide spinner after successful fetch', () => {
    const container = mountComponent(initialStore);
    const spinner = findByTestAttr(container, 'preloader');
    expect(spinner.length).toBe(0);
  });

  it('display section after successfull user fetch', () => {
    const container = mountComponent(initialStore);
    const section = findByTestAttr(container, 'section-account');
    expect(section.length).toBe(1);
  });

  it('should run function getUsers', () => {
    initialState = {
      users: [],
    };

    const mockStore = store(initialState);
    const wrapper = mount(
      <BrowserRouter>
        <Provider store={mockStore}>
          <ToastProvider>
            <MyAccount />
          </ToastProvider>
        </Provider>
      </BrowserRouter>
    );

    expect(
      wrapper
        .find('Provider')
        .prop('store')
        .getActions()
    ).toEqual([usersOperations.getUsers()]);
  });

  it('check if button logout exists and fires function on click', async () => {
    const wrapper = mountComponent(initialStore);
    await act(async () => {
      wrapper;
    });
    wrapper.update();
    const button = findByTestAttr(wrapper, 'logoutBtn');
    expect(button.length).toBe(1);

    let store = null;
    store = mockStore(initialStore);
    store.dispatch = jest.fn();
    const spyAction = jest
      .spyOn(logoutUserActions, 'logoutUser')
      .mockImplementation(() => ({ type: '' })); // mock function openNewsSidebar

    button.simulate('click');

    expect(spyAction).toHaveBeenCalledTimes(1);
  });
});
