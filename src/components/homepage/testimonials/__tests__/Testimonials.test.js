import { Provider } from 'react-redux';
import React from 'react';
import Testimonials from '../Testimonials';
import { act } from 'react-dom/test-utils';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { ToastProvider } from 'react-toast-notifications';
import axios from 'axios';
import TESTIMONIALS_MOCK from '../__fixtures__/testimonials';

jest.mock('axios');

axios.get.mockResolvedValue({
  data: TESTIMONIALS_MOCK,
});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialStore = mockStore({
  testimonialsState: {
    users: [],
    hideTestimonialButton: false,
    showLoginButton: false,
    showAddTestimonialForm: false,
    isLoading: true,
    showButtonSpinner: false,
  },
});

const mountComponent = (store) =>
  mount(
    <Provider store={store}>
      <ToastProvider>
        <Testimonials testimonials={TESTIMONIALS_MOCK} />
      </ToastProvider>
    </Provider>
  );

describe('<Testimonials />', () => {
  it('renders Testimonials component without crash', async () => {
    const wrapper = mountComponent(initialStore);
    await act(async () => {
      wrapper;
    });

    expect(wrapper.length).toBe(1);
  });
});
