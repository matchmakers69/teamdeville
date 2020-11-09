import React from 'react';
import { mount } from 'enzyme';
import SearchProductsInput from '../SearchProductsInput';
import { findByTestAttr } from '../../../../tests/testUtils';

const mockHandleSubmitForm = jest.fn();

const setup = () => {
  return mount(
    <SearchProductsInput
      productsSearchQuery='new bumper'
      isSearchQueryValid={true}
      handleSearchInputChange={() => {}}
      handleSubmitSearchProducts={mockHandleSubmitForm}
    />
  );
};

describe('<SearchProductsInput />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  it('component renders without crushing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('input has default value', () => {
    const searchInput = findByTestAttr(wrapper, 'searchInput');
    expect(searchInput.props().value).toEqual('new bumper');
  });

  it('form can be sent if isSearchQueryValid is true', () => {
    const sumbitButton = findByTestAttr(wrapper, 'buttonSubmit');
    sumbitButton.simulate('submit');
    sumbitButton.update();
    expect(mockHandleSubmitForm).toHaveBeenCalledTimes(1);
  });
});
