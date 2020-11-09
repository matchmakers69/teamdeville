import * as showPopupActions from '../../../actions/actionsPopUpInfo';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import ShoppingList from '../../cartPage/ShoppingList';
import ShoppingListData from '../../myAccount/__fixtures__/shoppingList';
import { ToastProvider } from 'react-toast-notifications';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import { findByTestAttr } from '../../../../tests/testUtils';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';

const MOCKED_DATA = ShoppingListData;

jest.mock('axios');
axios.get.mockResolvedValue({ data: MOCKED_DATA });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialStore = mockStore({
  cartState: {
    purchasedProducts: MOCKED_DATA,
  },
  popUpState: {
    open: false,
  },
  wooState: {
    isConfirmationModalOpened: false,
  },
});

const mountComponent = (store) =>
  mount(
    <Provider store={store}>
      <BrowserRouter>
        <ToastProvider>
          <ShoppingList />
        </ToastProvider>
      </BrowserRouter>
    </Provider>
  );

describe('<ShoppingList />', () => {
  it('renders ShoppingList component without crash', async () => {
    const wrapper = mountComponent(initialStore);
    await act(async () => {
      wrapper;
    });

    expect(wrapper.length).toBe(1);
  });

  it('check if div loader exists', async () => {
    const wrapper = mountComponent(initialStore);
    await act(async () => {
      wrapper;
    });
    const loader = findByTestAttr(wrapper, 'pageLoader');
    expect(loader.length).toBe(1);
  });

  it('fetch shopping list content async call', async () => {
    const wrapper = mountComponent(initialStore);
    await act(async () => {
      wrapper;
    });
    wrapper.update();
    const section = findByTestAttr(wrapper, 'section-shopping');
    expect(section.length).toBe(1);
  });

  it('should fire handleViewPolicy function when button is clicked', async () => {
    const wrapper = mountComponent(initialStore);

    let store = null;
    store = mockStore(initialStore);
    store.dispatch = jest.fn();

    await act(async () => {
      wrapper;
    });
    wrapper.update();

    const spyAction = jest.spyOn(showPopupActions, 'showPopup');

    // jest.spyOn(showPopupActions, 'showPopup').mockImplementation(() => {

    // });
    const button = wrapper.find('[data-test="policyButton"]');
    expect(button.length).toEqual(1);

    button.simulate('click');
    expect(spyAction).toHaveBeenCalledTimes(1);
  });
});
