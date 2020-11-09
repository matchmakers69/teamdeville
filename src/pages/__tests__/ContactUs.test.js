import { BrowserRouter } from 'react-router-dom';
import ContactUs from '../ContactUs';
import { Provider } from 'react-redux';
import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({}),
}));
const middlewares = [thunk];

describe('<ContactUs />', () => {
  let store = {};
  let initialState = {};

  beforeEach(() => {
    store = configureMockStore(middlewares);
    initialState = {
      wooState: {
        isConfirmationModalOpened: false,
      },
    };
  });

  it('runs component without crushing', () => {
    let container;
    const mockStore = store(initialState);

    container = shallow(
      <Provider store={mockStore}>
        <BrowserRouter>
          <ToastProvider>
            <ContactUs />
          </ToastProvider>
        </BrowserRouter>
      </Provider>
    );

    container.update();
    expect(container.length).toBe(1);
  });
});
