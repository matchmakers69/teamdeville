import ContactDetails from '../ContactDetails';
import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import contactDataObject from '../../../pages/__fixtures__/contact';
import { findByTestAttr } from '../../../../tests/testUtils';
import { mount } from 'enzyme';
import wordpressConfig from '../../../utils/wordpress.config';

const flushPromises = () => new Promise(setImmediate);

const MOCKED_DATA = contactDataObject;

const URL = wordpressConfig.jsonUrl;
const CONTACT_PAGE_URL = `${URL}pages?slug=contact`;

axios.get.mockImplementation((url) => {
  if (url === CONTACT_PAGE_URL) {
    return Promise.resolve({
      data: {
        MOCKED_DATA,
      },
    });
  }
});

describe('<ContactDetails />', () => {
  it('check if PageLoader exists', async (done) => {
    let container;

    container = mount(
      <ToastProvider>
        <ContactDetails />
      </ToastProvider>
    );
    await act(async () => {
      container;
    });
    const loader = findByTestAttr(container, 'pageLoader');
    container.update();
    expect(loader.length).toBe(1);
    done();
  });
  it('check if section shows up after data is loaded', async () => {
    let container;

    container = mount(
      <ToastProvider>
        <ContactDetails />
      </ToastProvider>
    );
    await act(async () => {
      container;
    });

    const loader = findByTestAttr(container, 'pageLoader');
    expect(loader.length).toBe(1);
    expect(axios.get).toHaveBeenCalledWith(CONTACT_PAGE_URL);

    await flushPromises();
    container.update();

    const section = findByTestAttr(container, 'contact-details-container');
    expect(section.length).toBe(1);

    const loaderFound = findByTestAttr(container, 'pageLoader');
    expect(loaderFound.length).toBe(0);
  });
});
