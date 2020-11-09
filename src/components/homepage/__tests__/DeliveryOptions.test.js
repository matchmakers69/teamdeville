import DeliveryOptions from '../../homepage/DeliveryOptions';
import { MOCKED_DELIVERY_OPTIONS } from '../__fixtures__/DeliveryOptions';
import React from 'react';
import axios from 'axios';
import { mount } from 'enzyme';

jest.mock('axios');

axios.get.mockResolvedValue({
  data: MOCKED_DELIVERY_OPTIONS,
});

const setup = () => {
  return mount(<DeliveryOptions />);
};

describe('<DeliveryOptions />', () => {
  it('renders DeliveryOptions component without crash', () => {
    const wrapper = setup();
    expect(wrapper.length).toBe(1);
  });
});
